import { prisma } from "../../../database.js";

export const create = async (req, res, next) => {
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

export const all = async (req, res, next) => {
  try {
    const result = await prisma.lesson.findMany();
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.lesson.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!result) {
      return next({
        message: "Lesson not found",
        status: 404,
      });
    }
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = (req, res) => {
  res.json({
    data: {},
  });
};

export const remove = (req, res) => {
  res.status(204);
  res.end();
};
