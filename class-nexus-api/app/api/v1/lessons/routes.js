import { Router } from "express";

import * as controller from "./controller.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true, 
});

router.route("/").get(controller.allLessons).post(controller.createLesson);

router.param("id", controller.idLesson);

router
  .route("/:id")
  .get(controller.readLesson)
  .put(controller.updateLesson)
  .patch(controller.updateLesson)
  .delete(controller.removeLesson);
