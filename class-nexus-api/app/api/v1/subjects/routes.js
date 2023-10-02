import { Router } from 'express';

import * as controller from './controller.js';
import { router as teachersRouter } from '../subjectsonteachers/routes.js';

import { router as lessonsRouter } from '../lessons/routes.js';
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

/**
 * /api/v1/subjects                     GET    -   Get all subjects
 * /api/v1/subjects                     POST   -   Create one subject
 * /api/v1/subjects/:id                 CRUD   -   CRUD Operations by api
 * /api/v1/subjects/n/:subjectname      GET    -   Get the subject id with the subject name
 * /api/v1/subjects/:subjectId/lessons         -   The lessons with that subject
 * /api/v1/subjects/:subjectId/teachers        -   The teachers with that subject
 */
router.route('/').get(controller.allSubjects).post(controller.createSubject);

router.param('id', controller.idSubject);
router.param('subjectname', controller.getSubjectId);

router
  .route('/:id')
  .get(controller.readSubject)
  .put(controller.updateSubject)
  .patch(controller.updateSubject)
  .delete(controller.removeSubject);

router.route('/n/:subjectname').get(controller.readSubject);

router.use('/:subjectId/teachers', teachersRouter); // Para poder sacar los profesores de esta etiqueta
router.use('/:subjectId/lessons', lessonsRouter); // Para poder sacar las clases con esta etiqueta
