import { z } from 'zod';
import escape from 'validator/lib/escape.js';

export const LessonSchema = z
  .object({
    description: z
      .string()
      .trim()
      .transform(function (value) {
        return escape(value);
      }),
    locInfo: z
      .string()
      .trim()
      .transform(function (value) {
        return escape(value);
      }),
    subjectId: z.string(),
    teacherId: z.string().optional(),
    status: z.string().optional(),
    scheduledAt: z.string().datetime(),
    site: z.string(),
  })
  .strict();

export const validateCreate = function (data) {
  return LessonSchema.safeParseAsync(data);
};
export const fields = [
  ...Object.keys(LessonSchema.shape),
  'id',
  'createdAt',
  'status',
  'teacher',
  'startedAt',
  'finishedAt',
  'duration',
];
