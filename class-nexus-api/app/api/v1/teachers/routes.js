import { Router } from "express";

import * as controller from "./controller.js";
import { router as lessonsRouter } from "../lessons/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/").get(controller.allTeachers).post(controller.createTeacher);

router.param("id", controller.idTeacher);

router
  .route("/:id")
  .get(controller.readTeacher)
  .put(controller.updateTeacher)
  .patch(controller.updateTeacher)
  .delete(controller.removeTeacher);

router.use("/:teacherId/lessons", lessonsRouter); // Para poder sacar las clases de ese usuario
