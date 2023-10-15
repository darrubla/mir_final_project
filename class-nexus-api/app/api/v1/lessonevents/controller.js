import { prisma } from '../../../database.js';
import { parsePaginationParams } from '../../../utils.js';

export const createEvent = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: authorId } = decoded;
  // Create the event, with the body and the auth user who made the change
  try {
    const result = await prisma.LessonEvents.create({
      data: {
        ...body,
        author: authorId,
      },
    });

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const allEvents = async (req, res, next) => {
  const { query, params = {} } = req;
  const { offset, limit } = parsePaginationParams(query);
  const orderBy = { date: 'asc' };
  const { lessonId } = params;
  // List the given lesson events
  try {
    const [result, total] = await Promise.all([
      prisma.LessonEvents.findMany({
        skip: offset,
        take: limit,
        orderBy,
        where: {
          lessonId,
        },
      }),
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

export const idEvent = async (req, res, next) => {
  const { params = {} } = req;
  // id of an specific event
  try {
    const result = await prisma.LessonEvents.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: 'Event not found',
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

export const readEvent = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};
