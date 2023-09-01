import { Router } from "express";

import * as controller from "./controller.js";
import { router as teachersRouter } from "../subjectsonteachers/routes.js";

import { router as lessonsRouter } from "../lessons/routes.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

router.route("/").get(controller.allSubjects).post(controller.createSubject);

router.param("id", controller.idSubject);
router.param("subjectname", controller.getSubjectId);

router
  .route("/:id")
  .get(controller.readSubject)
  .put(controller.updateSubject)
  .patch(controller.updateSubject)
  .delete(controller.removeSubject);

router.route("/n/:subjectname").get(controller.readSubject);

router.use("/:subjectId/teachers", teachersRouter); // Para poder sacar los profesores de esta etiqueta
router.use("/:subjectId/lessons", lessonsRouter); // Para poder sacar las clases con esta etiqueta
