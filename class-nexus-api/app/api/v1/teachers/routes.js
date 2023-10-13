import { Router } from 'express';

import * as controller from './controller.js';
import { activate, auth, me } from '../auth.js';
import { upload } from '../upload.js';
import { router as lessonsRouter } from '../lessons/routes.js';
import { router as subjectsRouter } from '../subjectsonteachers/routes.js';

// eslint-disable-next-line new-cap
export const router = Router();
/**
 * /api/v1/teachers/signin/teacher POST   -   SignIn with credentials
 * /api/v1/teachers/signup/teacher POST   -   Create teacher account
 * /api/v1/teachers                GET    -   list all the teachers
 * /api/v1/teachers/me             GET    -   Get the current authenticated user
 * /api/v1/teachers/:id            GET    -   Read one teacher
 * /api/v1/teachers/:id            PUT    -   Update one teacher
 * /api/v1/teachers/:id/lessons           -   The teacher's lessons
 * /api/v1/teachers/:id/subjects          -   The teacher's subjects
 */
router
  .route('/signup/teacher')
  .post(
    upload.single('profilePhoto'),
    controller.signup,
    controller.confirmation,
  );
router.route('/signin/teacher').post(controller.signin);

router.route('/confirmation').post(controller.confirmation);
router.route('/activate/:token').get(activate, controller.activate);

router.route('/me').get(auth, controller.myInfo);
router.route('/').get(controller.allTeachers);

router.param('id', controller.idTeacher);

router
  .route('/:id')
  .get(auth, controller.readTeacher)
  .put(auth, me, controller.updateTeacher)
  .patch(auth, me, controller.updateTeacher)
  .delete(auth, me, controller.removeTeacher);

router.use('/:teacherId/lessons', lessonsRouter); // Para poder sacar las clases de ese profesor
router.use('/:teacherId/subjects', subjectsRouter); // Para poder sacar las etiquetas de ese profesor
