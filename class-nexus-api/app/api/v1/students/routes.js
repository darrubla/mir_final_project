import { Router } from "express";

import * as controller from "./controller.js";
import { auth, me } from "../auth.js";
import { router as lessonsRouter } from "../lessons/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/signup/student").post(controller.signup);
router.route("/signin/student").post(controller.signin);
router.route("/").get(controller.allStudents); // .post(controller.createStudent);

router.param("id", controller.idStudent);

router
  .route("/:id")
  .get(auth, me, controller.readStudent)
  .put(auth, me, controller.updateStudent)
  .patch(auth, me, controller.updateStudent)
  .delete(auth, me, controller.removeStudent);

router.use("/:studentId/lessons", lessonsRouter); // Para poder sacar las clases de ese estudiante
