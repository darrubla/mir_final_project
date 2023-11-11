import { hash, compare } from 'bcrypt';
import { z } from 'zod';
import escape from 'validator/lib/escape.js';

export const StudentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
    lastname: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
      bio: z
      .string()
      .trim()
      .min(10)
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
    age: z.number(),
    profilePhoto: z.string().optional(),
  })
  .strict();

export const LoginStSchema = z
  .object({
    email: z.string().email().trim().toLowerCase().max(256),
    password: z.string().trim().min(6).max(16),
  })
  .strict();

export const UserStSchema = StudentSchema.merge(LoginStSchema);

export const fields = ['id', 'password', 'createdAt', 'updatedAt'];

export const encryptPassword = (password) => {
  return hash(password, 10);
};

export const verifyPassword = (password, encryptPassword) => {
  return compare(password, encryptPassword);
};
