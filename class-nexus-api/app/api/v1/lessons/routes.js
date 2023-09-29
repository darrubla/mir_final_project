import { Router } from "express";

import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
import { router as eventsRouter } from "../lessonevents/routes.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

/**
 * /api/v1/lessons GET        -  READ ALL OR BY USER/SUBJECT ID
 * /api/v1/lessons POST       -  Create a Lesson
 * /api/v1/lessons/:id GET    -  Read one
 * /api/v1/lessons/:id PUT    -  Update one (Student cancel)
 * /api/v1/lessons/:id DELETE -  Delete one
 *
 * /api/v1/lessons/s GET      -  Available lessons to slect for the teacher
 * /api/v1/lessons/:id/s PUT  -  Assign lesson to teacher (teacher id from auth)
 *
 * /api/v1/lessons/:id/events GET  - Lesson table events
 */
router.route("");
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

router.use("/:lessonId/events", eventsRouter);
