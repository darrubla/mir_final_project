import { faker } from '@faker-js/faker';

export const getTeacher = (overrides = {}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return Object.assign(
    {
      name: faker.person.firstName({
        firstName,
      }),
      lastname: faker.person.lastName({
        lastName,
      }),
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      age: faker.number.int({ max: 50 }),
      points: faker.number.int({ max: 12100 }),
    },
    overrides,
  );
};
