import { Router } from "express";

import * as controller from "./controller.js";
import { auth, me } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

router
  .route("/")
  .get(auth, controller.allSubjectsOnTeachers)
  .post(auth, me, controller.createSubjectOnTeacher)
  .delete(controller.deleteSubjectOnTeacher);

router.param("id", controller.idSubjectOnTeacher);

router
  .route("/:id")
  .get(controller.readSubjectOnTeacher)
  .put(controller.updateSubjectOnTeacher)
  .patch(controller.updateSubjectOnTeacher);
