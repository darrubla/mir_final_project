// import { prisma } from "./database";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const lessonExpiredStatusThread = async (req, res, next) => {
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
    console.log("Updated expired");
  } catch (error) {
    console.log(error);
  }
};

export const lessonFinishedStatusThread = async (req, res, next) => {
  try {
    const currentDate = new Date();
    await prisma.lesson.updateMany({
      where: {
        status: "Scheduled",
        scheduledAt: {
          lte: new Date(currentDate.setMinutes(currentDate.getMinutes()) - 65),
        },
      },
      data: {
        status: "Finished",
        finishedAt: currentDate,
      },
    });
    console.log("Updated finished");
  } catch (error) {
    console.log(error);
  }
};
