import { prisma } from '../../../database.js';
import { parsePaginationParams } from '../../../utils.js';
import { LessonSchema } from './model.js';
import { transporter } from '../../../mail.js';
import activateAccountBody from '../../html/accountActivation.js';
import logo from '../../html/logo.js';

export const createLesson = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: studentId } = decoded;
  // const { studentId, scheduledAt } = body;
  const { scheduledAt } = body;
  const date = new Date(scheduledAt);
  try {
    const { success, data, error } = await LessonSchema.safeParseAsync({
      ...body,
    });
    if (!success) {
      return next({
        message: 'Validation error',
        status: 400,
        error,
      });
    }
    const defaultTime = 60;
    const createdLessons = await prisma.lesson.findMany({
      include: {
        student: {
          select: {
            name: true,
            lastname: true,
            email: true,
          },
        },
        subject: {
          select: {
            subjectname: true,
          },
        },
        teacher: {
          select: {
            name: true,
            lastname: true,
            email: true,
          },
        },
      },
      where: {
        // Clases de este estudiante, para no cruzarse
        AND: [
          {
            studentId,
          },
          {
            OR: [
              {
                AND: [
                  { status: 'Scheduled' },
                  {
                    scheduledAt: {
                      gte: new Date(date.getTime() - defaultTime * 60000),
                    },
                  },
                  {
                    scheduledAt: {
                      lte: new Date(date.getTime() + defaultTime * 60000),
                    },
                  },
                ],
              },
              {
                AND: [
                  { status: 'Ongoing' },
                  {
                    startedAt: {
                      lte: new Date(date.getTime() + defaultTime * 60000),
                    },
                  },
                  {
                    startedAt: {
                      gte: new Date(date.getTime() - defaultTime * 60000),
                    },
                  },
                ],
              },
              {
                AND: [
                  { status: 'Pending' },
                  {
                    scheduledAt: {
                      gte: new Date(date.getTime() - defaultTime * 60000),
                    },
                  },
                  {
                    scheduledAt: {
                      lte: new Date(date.getTime() + defaultTime * 60000),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    if (createdLessons.length > 0) {
      // Si se encontraron clase que pueden cruzarse
      next({
        message: 'Overlaps in time with another class :(',
        status: 400,
      });
    } else {
      if (date < new Date()) {
        next({
          message: 'You cannot schedule a class for a past date',
          status: 400,
        });
      } else {
        try {
          const result = await prisma.lesson.create({
            data: {
              ...data,
              studentId,
            },
          });
          res.status(201).res.json({
            data: result,
          });
          /* try {
            await transporter.sendMail({
              from: `Forgot password <${process.env.NODEMAILER_EMAIL_SENDER}>`,
              to: 'carlos9559@gmail.com',
              subject: 'Email 1st attempt',
              text: 'Sending mail with modemailer',
              html: activateAccountBody,
              attachments: logo,
            });
          } catch (error) {
            emailStatus = error;
            return res
              .status(400)
              .json({ message: 'Something went wrong! :(' });
          }*/
        } catch (error) {
          next(error);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
// ----------- lessons by student:
export const myLessons = async (req, res, next) => {
  const { query, params, decoded = {} } = req;
  const { subjectId } = params;
  // const { id: studentId } = decoded;
  const { id: userId } = decoded;
  const { offset, limit } = parsePaginationParams(query);
  const orderBy = { scheduledAt: 'asc' };
  // const { emailStudent, emailTeacher } = params;

  try {
    const [result, total] = await Promise.all([
      prisma.lesson.findMany({
        skip: offset,
        take: limit,
        orderBy,
        include: {
          student: {
            // Para que solo me traiga estos campos
            select: {
              name: true,
              lastname: true,
              email: true,
              profilePhoto: true,
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
              profilePhoto: true,
            },
          },
        },
        where: {
          OR: [{ studentId: userId }, { teacherId: userId }, { subjectId }],
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
      },
    });
  } catch (error) {
    next(error);
  }
};
export const availableLessons = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id: teacherId } = decoded;

  try {
    const teacher = await prisma.Teacher.findUnique({
      include: {
        subjects: {
          select: {
            subject: true,
          },
        },
      },
      where: {
        id: teacherId,
      },
    });
    const teacherSubjectsArray = teacher?.subjects;
    const matchingClass = [];
    for (const teacherSubject of teacherSubjectsArray) {
      const lessonsMatch = await prisma.lesson.findMany({
        where: {
          teacherId: null,
          subjectId: teacherSubject.subject.id,
          status: 'Pending',
        },
        include: {
          student: {
            select: {
              name: true,
              lastname: true,
              email: true,
              profilePhoto: true,
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
      });
      matchingClass.push(...lessonsMatch);
    }
    res.json({
      data: matchingClass,
    });
  } catch (error) {
    next(error);
  }
};
export const allLessons = async (req, res, next) => {
  const { query, params } = req;
  const { offset, limit } = parsePaginationParams(query);
  const orderBy = { scheduledAt: 'asc' };
  const { studentId, teacherId, subjectId } = params;

  try {
    const [result, total] = await Promise.all([
      prisma.lesson.findMany({
        skip: offset,
        take: limit,
        orderBy,
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
          subjectId,
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
        message: 'Lesson not found',
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

export const assignLesson = async (req, res, next) => {
  const { body = {}, params = {}, decoded = {} } = req;
  const { id: teacherId } = decoded;
  const { id } = params;

  try {
    const currentLesson = await prisma.lesson.findUnique({
      where: {
        id,
      },
    });
    const { scheduledAt } = currentLesson;
    console.log('ScheduledAt', scheduledAt);
    const date = new Date(scheduledAt);
    const defaultTime = 65;
    const acceptedLessons = await prisma.lesson.findMany({
      include: {
        student: {
          select: {
            email: true,
          },
        },
        subject: {
          select: {
            subjectname: true,
          },
        },
        teacher: {
          select: {
            email: true,
          },
        },
      },
      where: {
        AND: [
          {
            teacherId,
          },
          {
            OR: [
              {
                AND: [
                  { status: 'Scheduled' },
                  {
                    scheduledAt: {
                      gte: new Date(date.getTime() - defaultTime * 60000),
                    },
                  },
                  {
                    scheduledAt: {
                      lte: new Date(date.getTime() + defaultTime * 60000),
                    },
                  },
                ],
              },
              {
                AND: [
                  { status: 'Ongoing' },
                  {
                    startedAt: {
                      lte: new Date(date.getTime() + defaultTime * 60000),
                    },
                  },
                  {
                    startedAt: {
                      gte: new Date(date.getTime() - defaultTime * 60000),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    if (acceptedLessons.length > 0) {
      next({
        message: 'Overlaps in time with another class :(',
        status: 400,
      });
    } else {
      const result = await prisma.lesson.update({
        where: {
          id,
        },
        data: {
          ...body,
          status: 'Scheduled',
          teacherId,
        },
      });

      res.json({
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
