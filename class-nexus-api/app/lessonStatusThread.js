// import { prisma } from "./database";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const lessonStatusThread = async (req, res, next) => {
  try {
    await prisma.lesson.updateMany({
      where: {
        status: "Pending",
        scheduledAt: {
          lte: new Date(),
        },
      },
      data: {
        status: "Expired",
      },
    });
    console.log("Updated");
  } catch (error) {
    console.log(error);
  }
};
