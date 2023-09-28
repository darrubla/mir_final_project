import { Router } from "express";

import * as controller from "./controller.js";
import { auth, me } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});
router
  .route("/s")
  .post(controller.createRelation)
  .delete(controller.deleteRelation);
router
  .route("/")
  .get(auth, controller.allSubjectsOnTeachers)
  .post(auth, controller.createSubjectOnTeacher);

router.param("id", auth, controller.idSubjectOnTeacher);

router
  .route("/:id")
  .get(controller.readSubjectOnTeacher)
  .put(controller.updateSubjectOnTeacher)
  .patch(controller.updateSubjectOnTeacher)
  .delete(auth, controller.deleteSubjectOnTeacher);
