import { prisma } from '../../app/database.js';

export const resetDb = async () => {
  await prisma.$transaction([
    prisma.lesson.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
  ]);
};
