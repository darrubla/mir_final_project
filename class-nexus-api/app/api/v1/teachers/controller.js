import { prisma } from "../../../database.js";
import { fields } from "./model.js";
import { parseOrderParams, parsePaginationParams } from "../../../utils.js";

export const createTeacher = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.Teacher.create({
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

export const allTeachers = async (req, res, next) => {
  const { query } = req;
  const { offset, limit } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });

  try {
    const [result, total] = await Promise.all([
      prisma.Teacher.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          lesson: {
            // Para que solo me traiga estos campos
            select: {
              id: true,
              subject: true,
            },
          },
          subjects: true,
          _count: {
            // Contar las clases de este usuario
            select: {
              lesson: true,
            },
          },
        },
      }),
      prisma.Teacher.count(),
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

export const idTeacher = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.Teacher.findUnique({
      where: {
        id: params.id,
      },
      include: {
        lesson: {
          // Para que solo me traiga estos campos
          select: {
            id: true,
            subject: true,
          },
        },
        subjects: true,
        _count: {
          // Contar las clases de este usuario
          select: {
            lesson: true,
          },
        },
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: "Teacher not found",
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

export const readTeacher = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateTeacher = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.Teacher.update({
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

export const removeTeacher = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.Teacher.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
