import { Router } from "express";

import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

router
  .route("/")
  .get(controller.allLessons)
  .post(auth, controller.createLesson);

router.param("id", controller.idLesson);

router
  .route("/:id")
  .get(controller.readLesson)
  .put(auth, owner, controller.updateLesson)
  .patch(auth, owner, controller.updateLesson)
  .delete(auth, owner, controller.removeLesson);
