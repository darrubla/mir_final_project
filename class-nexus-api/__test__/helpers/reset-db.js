import { prisma } from '../../app/database.js';

export const resetDb = async () => {
  await prisma.$transaction([
    prisma.lesson.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
  ]);
};
