import { Router } from "express";

import * as controller from "./controller.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true
});

router
  .route("/")
  .get(controller.allSubjectsOnTeachers)
  .post(controller.createSubjectOnTeacher);

router.param("id", controller.idSubjectOnTeacher);

router
  .route("/:id")
  .get(controller.readSubjectOnTeacher)
  .put(controller.updateSubjectOnTeacher)
  .patch(controller.updateSubjectOnTeacher)
  .delete(controller.removeSubjectOnTeacher);
