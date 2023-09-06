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
        status: "Canceled",
      },
    });
    console.log("Checking for expired lessons");
  } catch (error) {
    console.log(error);
  }
};

export const lessonFinishedStatusThread = async (req, res, next) => {
  try {
    const defaultDuration = 65;
    const currentDate = new Date();
    const getLessons = await prisma.lesson.findMany({
      where: {
        status: "Ongoing",
        startedAt: {
          lte: new Date(currentDate.getTime() - defaultDuration * 60000),
        },
      },
    });
    getLessons.map(async (getLesson) => {
      const startedTime = getLesson.startedAt;
      await prisma.lesson.update({
        where: {
          id: getLesson.id,
        },
        data: {
          status: "Finished",
          finishedAt: new Date(startedTime.getTime() + defaultDuration * 60000),
          duration: defaultDuration,
        },
      });
    });
    console.log("Checking for unfinished lessons");
  } catch (error) {
    console.log(error);
  }
};

export const lessonNotStartedStatusThread = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const cancelTime = 20; // minutes
    await prisma.lesson.updateMany({
      where: {
        status: "Scheduled",
        scheduledAt: {
          lte: new Date(currentDate.getTime() - cancelTime * 60000),
        },
      },
      data: {
        status: "Canceled",
      },
    });
    console.log("Checking for started lessons");
  } catch (error) {
    console.log(error);
  }
};
