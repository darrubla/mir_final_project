import { Router } from "express";

import * as controller from "./controller.js";
import { router as lessonsRouter } from "../lessons/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/").get(controller.allStudents).post(controller.createStudent);

router.param("id", controller.idStudent);

router
  .route("/:id")
  .get(controller.readStudent)
  .put(controller.updateStudent)
  .patch(controller.updateStudent)
  .delete(controller.removeStudent);

router.use("/:studentId/lessons", lessonsRouter); // Para poder sacar las clases de ese estudiante
