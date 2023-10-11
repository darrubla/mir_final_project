import { prisma } from '../../../database.js';
import { Prisma } from '@prisma/client';
import { parsePaginationParams } from '../../../utils.js';
import { signToken } from '../auth.js';
import {
  LoginStSchema,
  UserStSchema,
  encryptPassword,
  verifyPassword,
} from './model.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req;
  const payload = {};
  payload.name = body.name;
  payload.lastname = body.lastname;
  payload.age = Number(body.age);
  payload.email = body.email;
  payload.password = body.password;

  try {
    const { success, data, error } = await UserStSchema.safeParseAsync({
      ...payload,
      profilePhoto: req.file?.path,
    });
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const password = await encryptPassword(data.password);
    const result = await prisma.Student.create({
      data: {
        ...data,
        password,
      },
      select: {
        name: true,
        email: true,
        password: true,
        joined: true,
      },
    });
    req.body.email = result.email;

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return next({
          message: 'A student account already exists with this email',
          status: 409, // Unauthorized
        });
      }
    }
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { body } = req;

  try {
    const { success, data, error } = await LoginStSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const { email, password } = data;
    const student = await prisma.Student.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        joined: true,
        profilePhoto: true,
      },
    });
    if (student === null) {
      return next({
        message: 'Invalid email or password',
        status: 401, // Unauthorized
      });
    }
    const passwordMatch = await verifyPassword(password, student.password);

    if (!passwordMatch) {
      return next({
        message: 'Invalid email or password',
        status: 401, // Unauthorized
      });
    }
    const { id } = student;
    const token = signToken({ id });
    res.json({
      data: {
        ...student,
        id: undefined,
        password: undefined,
      },
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const allStudents = async (req, res, next) => {
  const { query } = req;
  const { offset, limit } = parsePaginationParams(query);
  const orderBy = { joined: 'asc' };

  try {
    const [result, total] = await Promise.all([
      prisma.Student.findMany({
        skip: offset,
        take: limit,
        orderBy,
        select: {
          name: true,
          email: true,
          joined: true,
          lesson: {
            // Para que solo me traiga estos campos
            select: {
              id: true,
              subject: true,
            },
          },
          _count: {
            // Contar las clases de este usuario
            select: {
              lesson: true,
            },
          },
        },
      }),
      prisma.Student.count(),
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

export const idStudent = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.Student.findUnique({
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
        message: 'Student not found',
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

export const readStudent = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateStudent = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const { success, data, error } =
      await UserStSchema.partial().safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const result = await prisma.Student.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeStudent = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.Student.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
