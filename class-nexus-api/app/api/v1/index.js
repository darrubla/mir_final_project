import { Router } from "express";

import { router as lessons } from "./lessons/routes.js";
import { router as lessonevents } from "./lessonevents/routes.js";
import { router as students } from "./students/routes.js";
import { router as teachers } from "./teachers/routes.js";
import { router as subjects } from "./subjects/routes.js";
import { router as subjectsonteachers } from "./subjectsonteachers/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/lessons", lessons);
router.use("/lessonevents", lessonevents);
router.use("/students", students);
router.use("/teachers", teachers);
router.use("/subjects", subjects);
router.use("/subjectsonteachers", subjectsonteachers);
