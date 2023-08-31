import { prisma } from "../../../database.js";
import { fields } from "./model.js";
import { parseOrderParams, parsePaginationParams } from "../../../utils.js";

export const createSubject = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.Subject.create({
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

export const allSubjects = async (req, res, next) => {
  const { query } = req;
  const { offset, limit } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });

  try {
    const [result, total] = await Promise.all([
      prisma.Subject.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          teachers: {
            select: {
              id: true,
            },
          },
          _count: {
            // Contar los profesores de esta etiqueta
            select: {
              teachers: true,
            },
          },
        },
      }),
      prisma.Subject.count(),
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

export const idSubject = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.Subject.findUnique({
      where: {
        id: params.id,
      },
      include: {
        teachers: {
          select: {
            id: true,
          },
        },
        _count: {
          // Contar los profesores de esta etiqueta
          select: {
            teachers: true,
          },
        },
      }
    });
    if (!result) {
      // (result === null)
      next({
        message: "Subject not found",
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

export const readSubject = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateSubject = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.Subject.update({
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

export const removeSubject = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.Subject.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
