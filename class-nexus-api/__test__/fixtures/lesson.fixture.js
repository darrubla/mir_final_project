import { faker } from '@faker-js/faker';

export const getLesson = (overrides = {}, studentId, subjectId) => {
  return Object.assign(
    {
      description: faker.lorem.paragraph(1),
      studentId,
      scheduledAt: '2023-10-16T12:20:00Z',
      site: 'Teacher Location',
      subjectId,
    },
    overrides,
  );
};
