import { prisma } from "../../../database.js";

export const createSubjectOnTeacher = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: teacherId } = decoded;
  try {
    const result = await prisma.SubjectsOnTeachers.create({
      data: {
        ...body,
        teacherId,
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

export const createRelation = async (req, res, next) => {
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
  const { params = {}, decoded = {} } = req;
  const { subjectId } = params;
  const { id: teacherId } = decoded;

  try {
    const result = await prisma.SubjectsOnTeachers.findUnique({
      where: {
        teacherId_subjectId: {
          subjectId,
          teacherId,
        },
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

export const deleteRelation = async (req, res, next) => {
  const { body = {} } = req;
  const { subjectId, teacherId } = body;

  try {
    const result = await prisma.SubjectsOnTeachers.delete({
      where: {
        teacherId_subjectId: {
          subjectId,
          teacherId,
        },
      },
    });
    res.json({
      data: result,
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
export const deleteSubjectOnTeacher = async (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { id: teacherId } = decoded;
  const { id: subjectId } = params;

  try {
    const result = await prisma.SubjectsOnTeachers.delete({
      where: {
        teacherId_subjectId: {
          subjectId,
          teacherId,
        },
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
