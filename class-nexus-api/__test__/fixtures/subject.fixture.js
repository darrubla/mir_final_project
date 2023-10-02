import { faker } from '@faker-js/faker';

export const getSubject = (overrides = {}) => {
  const subjectname = faker.music.genre();

  return Object.assign(
    {
      subjectname,
    },
    overrides,
  );
};
