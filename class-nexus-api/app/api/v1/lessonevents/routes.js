import { Router } from "express";

import * as controller from "./controller.js";
import { auth } from "../auth.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

router.route("/").get(controller.allEvents).post(auth, controller.createEvent);

router.param("id", controller.idEvent);

router.route("/:id").get(controller.readEvent);
