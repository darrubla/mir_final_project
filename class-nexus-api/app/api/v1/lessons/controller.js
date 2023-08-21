import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const all = (req, res) => {
  res.json({
    data: [],
  });
};

export const read = (req, res) => {
  res.json({
    data: {},
  });
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
