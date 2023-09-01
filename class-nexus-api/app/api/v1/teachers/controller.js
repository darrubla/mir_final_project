import { prisma } from "../../../database.js";
import { parsePaginationParams } from "../../../utils.js";

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
  const { query, params } = req;
  const { offset, limit } = parsePaginationParams(query);
  const orderBy = { name: "asc" };
  const { subjectId } = params;
  try {
    const [result, total] = await Promise.all([
      prisma.Teacher.findMany({
        skip: offset,
        take: limit,
        orderBy,
        include: {
          lesson: {
            select: {
              id: true,
              subject: true,
            },
          },
          subjects: {
            select: {
              subject: true,
            },
          },
          _count: {
            // Contar las clases de este usuario
            select: {
              lesson: true,
              subjects: true,
            },
          },
        },
        where: {
          subjects: {
            subjectId,
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
          select: {
            id: true,
            subject: true,
          },
        },
        subjects: {
          select: {
            subject: true,
          },
        },
        _count: {
          // Contar las clases de este usuario
          select: {
            lesson: true,
            subjects: true,
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
