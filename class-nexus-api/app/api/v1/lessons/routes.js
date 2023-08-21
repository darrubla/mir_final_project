import { Router } from "express";

import * as controller from "./controller.js";
// eslint-disable-next-line new-cap
export const router = Router();

router.route("/").get(controller.all).post(controller.create);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
