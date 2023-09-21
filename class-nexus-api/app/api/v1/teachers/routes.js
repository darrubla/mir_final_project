import { Router } from "express";

import * as controller from "./controller.js";
import { auth, me } from "../auth.js";
import { router as lessonsRouter } from "../lessons/routes.js";
import { router as subjectsRouter } from "../subjectsonteachers/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/signup/teacher").post(controller.signup);
router.route("/signin/teacher").post(controller.signin);

router.route("/me").get(auth, controller.myInfo);
router.route("/").get(controller.allTeachers);

router.param("id", controller.idTeacher);

router
  .route("/:id")
  .get(auth, controller.readTeacher)
  .put(auth, me, controller.updateTeacher)
  .patch(auth, me, controller.updateTeacher)
  .delete(auth, me, controller.removeTeacher);

router.use("/:teacherId/lessons", lessonsRouter); // Para poder sacar las clases de ese profesor
router.use("/:teacherId/subjects", subjectsRouter); // Para poder sacar las etiquetas de ese profesor
