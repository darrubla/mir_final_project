import { prisma } from '../../../database.js';
import { Prisma } from '@prisma/client';
import { parsePaginationParams } from '../../../utils.js';
import { signToken } from '../auth.js';
import { transporter } from '../../../mail.js';
import activateAccountBody from '../../html/accountActivation.js';
import logo from '../../html/logo.js';
import {
  LoginThSchema,
  UserThSchema,
  encryptPassword,
  verifyPassword,
} from './model.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req;
  const payload = {};
  payload.name = body.name;
  payload.lastname = body.lastname;
  payload.bio = body.bio;
  payload.age = Number(body.age);
  payload.email = body.email;
  payload.password = body.password;

  try {
    const { success, data, error } = await UserThSchema.safeParseAsync({
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
    const result = await prisma.Teacher.create({
      data: {
        ...data,
        password,
      },
      select: {
        email: true,
      },
    });
    req.body.email = result.email;
    next();
    /* res.status(201);
    res.json({
      data: result,
    });*/
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return next({
          message: 'A teacher account already exists with this email',
          status: 409, // Unauthorized
        });
      }
    }
    next(error);
  }
};

export const confirmation = async (req, res, next) => {
  const { body = {} } = req;
  const { email } = body;

  try {
    const teacher = await prisma.Teacher.findUnique({
      where: {
        email,
        active: false,
      },
    });

    if (teacher === null) {
      return next({
        message: 'Confirmation failed',
        status: 400,
      });
    } else {
      const token = signToken({ email }, '2h');

      await transporter.sendMail({
        from: `Class Nexus ${process.env.EMAIL_SENDER}`,
        to: email,
        subject: 'Activate your account',
        text: `
          Visit the following link to activate your account:
          ${process.env.WEB_URL}/activate_teacher/${token}
        `,
        html: activateAccountBody(token, 'teacher'),
        attachments: logo,
      });

      res.status(201);
      res.json({
        data: teacher,
        meta: {
          token,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const activate = async (req, res, next) => {
  const { decoded = {} } = req;
  const { email } = decoded;

  try {
    const teacher = await prisma.Teacher.update({
      where: {
        email,
      },
      select: {
        name: true,
        email: true,
        profilePhoto: true,
      },
      data: {
        active: true,
      },
    });
    if (teacher === null) {
      return next({
        message: 'Activation failed',
        status: 400,
      });
    } else {
      res.json({
        data: teacher,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { body } = req;

  try {
    const { success, data, error } = await LoginThSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const { email, password } = data;
    const teacher = await prisma.Teacher.findUnique({
      where: {
        email,
        active: true,
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
    if (teacher === null) {
      return next({
        message: 'Invalid email or password',
        status: 401, // Unauthorized
      });
    }
    const passwordMatch = await verifyPassword(password, teacher.password);

    if (!passwordMatch) {
      return next({
        message: 'Invalid email or password',
        status: 401, // Unauthorized
      });
    }
    const { id } = teacher;
    const token = signToken({ id });
    res.json({
      data: {
        ...teacher,
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

export const allTeachers = async (req, res, next) => {
  const { query, params } = req;
  const { offset, limit } = parsePaginationParams(query);
  const orderBy = { name: 'asc' };
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
        message: 'Teacher not found',
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

export const myInfo = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id: teacherId } = decoded;
  try {
    const result = await prisma.Teacher.findUnique({
      include: {
        lesson: {
          select: {
            id: true,
            subject: true,
            description: true,
            site: true,
            scheduledAt: true,
            status: true,
            teacher: true,
            student: true,
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
        id: teacherId,
      },
    });

    res.json({
      data: result,
    });
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
    const { success, data, error } =
      await UserThSchema.partial().safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const result = await prisma.Teacher.update({
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
