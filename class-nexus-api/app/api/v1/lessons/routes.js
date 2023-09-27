import { Router } from "express";

import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});
router.route("")
router.route("/s").get(auth, controller.availableLessons);
router
  .route("/")
  .get(auth, controller.myLessons)
  .post(auth, controller.createLesson);

router.param("id", controller.idLesson);

router
  .route("/:id")
  .get(auth, owner, controller.readLesson)
  .put(auth, owner, controller.updateLesson)
  .patch(auth, owner, controller.updateLesson)
  .delete(auth, owner, controller.removeLesson);

router.route("/:id/s").put(auth, controller.assignLesson);
