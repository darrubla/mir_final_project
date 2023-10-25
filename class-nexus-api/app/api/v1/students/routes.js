import { Router } from 'express';

import * as controller from './controller.js';
import { activate, auth, me } from '../auth.js';
import { upload } from '../upload.js';
import { router as lessonsRouter } from '../lessons/routes.js';

// eslint-disable-next-line new-cap
export const router = Router();
/**
 * /api/v1/students/signin/student      POST   -   SignIn with credentials
 * /api/v1/students/signup/student      POST   -   Create student account
 * /api/v1/students                     GET    -   list all the students
 * /api/v1/students/:id                 GET    -   Read one student
 * /api/v1/students/:id                 PUT    -   Update one student
 * /api/v1/students/:id/lessons                -   The student's lessons
 */
router
  .route('/signup/student')
  .post(
    upload.single('profilePhoto'),
    controller.signup,
    controller.confirmation,
  );
router.route('/signin/student').post(controller.signin);

router.route('/confirmation_student').post(controller.confirmation);
router.route('/activate_student/:token').get(activate, controller.activate);

router.route('/').get(controller.allStudents); // .post(controller.createStudent);

router.param('id', controller.idStudent);

router
  .route('/:id')
  .get(auth, controller.readStudent)
  .put(auth, me, controller.updateStudent)
  .patch(auth, me, controller.updateStudent)
  .delete(auth, me, controller.removeStudent);

router.use('/:studentId/lessons', lessonsRouter); // Para poder sacar las clases de ese estudiante
// router.use("/:emailStudent/lessons", lessonsRouter); // Para poder sacar las clases de ese estudiante
