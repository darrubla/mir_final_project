import { faker } from '@faker-js/faker';

export const getLesson = (overrides = {}, studentId) => {
  return Object.assign(
    {
      description: faker.lorem.paragraph(1),
      studentId,
      scheduledAt: '2023-10-16T12:20:00Z',
      site: 'Teacher Location',
      subjectId: '33ef5295-9be9-423c-92b5-9795ae7a2710',
    },
    overrides,
  );
};
