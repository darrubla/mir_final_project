import { prisma } from "../../../database.js";

export const createSubjectOnTeacher = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.SubjectsOnTeachers.create({
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

export const allSubjectsOnTeachers = async (req, res, next) => {
  const { params } = req;
  const { teacherId, subjectId } = params;
  console.log(params);
  try {
    const [result] = await Promise.all([
      prisma.SubjectsOnTeachers.findMany({
        include: {
          teacher: {
            select: {
              name: true,
            },
          },
          subject: {
            select: {
              subjectname: true,
            },
          },
        },
        where: {
          teacherId,
          subjectId,
        },
      }),
      prisma.SubjectsOnTeachers.count(),
    ]);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const idSubjectOnTeacher = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.SubjectsOnTeachers.findUnique({
      where: {
        id: params.id,
      },
      include: {
        subject: {
          select: {
            idSubject: true,
          },
        },
        teacher: {
          select: {
            idTeacher: true,
          },
        },
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: "Relation not found",
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

export const readSubjectOnTeacher = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateSubjectOnTeacher = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.SubjectsOnTeachers.update({
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

export const removeSubjectOnTeacher = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.SubjectsOnTeachers.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
