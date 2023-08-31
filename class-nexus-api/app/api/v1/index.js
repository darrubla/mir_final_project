import { Router } from "express";

import { router as lessons } from "./lessons/routes.js";
import { router as students } from "./students/routes.js";
import { router as teachers } from "./teachers/routes.js";
import { router as subjects } from "./subjects/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/lessons", lessons);
router.use("/students", students);
router.use("/teachers", teachers);
router.use("/subjects", subjects);
