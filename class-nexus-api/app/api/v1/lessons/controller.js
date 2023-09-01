import { prisma } from "../../../database.js";
import { fields } from "./model.js";
import { parseOrderParams, parsePaginationParams } from "../../../utils.js";

export const createLesson = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.lesson.create({
      data: body,
    });

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const allLessons = async (req, res, next) => {
  const { query, params } = req;
  const { offset, limit } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });

  const { studentId, teacherId } = params;

  try {
    const [result, total] = await Promise.all([
      prisma.lesson.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          student: {
            // Para que solo me traiga estos campos
            select: {
              name: true,
              lastname: true,
              email: true,
            },
          },
          subject: {
            // Para que solo me traiga estos campos
            select: {
              subjectname: true,
            },
          },
          teacher: {
            // Para que solo me traiga estos campos
            select: {
              name: true,
              lastname: true,
              email: true,
            },
          },
        },
        where: {
          studentId, // studentId == studentId
          teacherId, // teacherId == teacherId
        },
      }),
      prisma.lesson.count(),
    ]);

    res.json({
      data: result,
      meta: {
        limit,
        offset,
        total,
        orderBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const idLesson = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.lesson.findUnique({
      include: {
        student: {
          // Para que solo me traiga estos campos
          select: {
            name: true,
            lastname: true,
            email: true,
          },
        },
        subject: {
          // Para que solo me traiga estos campos
          select: {
            subjectname: true,
          },
        },
        teacher: {
          // Para que solo me traiga estos campos
          select: {
            name: true,
            lastname: true,
            email: true,
          },
        },
      },
      where: {
        id: params.id,
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: "Lesson not found",
        status: 404,
      });
    } else {
      req.data = result;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const readLesson = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateLesson = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.lesson.update({
      where: {
        id,
      },
      data: body,
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeLesson = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.lesson.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
