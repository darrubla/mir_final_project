import { Router } from 'express';

import * as controller from './controller.js';
import { auth, me } from '../auth.js';

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});
/**
 * /api/v1/subjectsonteacher/s        POST       -   Create relation teacher-subject (by teacher)
 * /api/v1/subjectsonteacher/s        DELETE     -   Delete relation teacher-subject (by teacher)
 * /api/v1/subjectsonteacher          POST       -   Create relation teacher-subject (by api)
 * /api/v1/subjectsonteacher          DELETE     -   Delete relation teacher-subject (by api)
 * /api/v1/subjectsonteacher/:id                 -   CRUD relations teacher subject (by api)
 */
router
  .route('/s')
  .post(controller.createRelation)
  .delete(controller.deleteRelation);
router
  .route('/')
  .get(auth, controller.allSubjectsOnTeachers)
  .post(auth, controller.createSubjectOnTeacher);

router.param('id', auth, controller.idSubjectOnTeacher);

router
  .route('/:id')
  .get(controller.readSubjectOnTeacher)
  .put(controller.updateSubjectOnTeacher)
  .patch(controller.updateSubjectOnTeacher)
  .delete(auth, controller.deleteSubjectOnTeacher);
