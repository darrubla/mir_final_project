import { Router } from "express";

import { router as lessons } from "./lessons/routes.js";
// eslint-disable-next-line new-cap
export const router = Router();

router.use("/lessons", lessons);
// router.use("/classes", lessons);
