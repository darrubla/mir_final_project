import request from 'supertest';

import { app } from '../app/index.js';
import { getStudent } from './fixtures/student.fixture.js';
import { getLesson } from './fixtures/lesson.fixture.js';
import { resetDb } from './helpers/reset-db.js';
import { beforeEach, expect } from 'vitest';

describe('Users Sign Up', () => {
  beforeEach(async () => {
    await resetDb();
  });
  test('signed successfully', async () => {
    const agent = request(app);

    const { name, lastname, email, age } = getStudent();
    const password = '12345678';
    const { description, scheduledAt, site, subjectId } = getLesson();
    const student = await agent.post('/api/students/signup/student').send({
      name,
      lastname,
      email,
      age,
      password,
    });
    expect(student.status).toBe(201);

    const login = await agent.post('/api/students/signin/student').send({
      email,
      password,
    });

    expect(login.status).toBe(200);

    const token = login.body.meta.token;

    const lesson = await agent
      .post('/api/lessons')
      .send({
        description,
        scheduledAt,
        site,
        subjectId,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(lesson.status).toBe(201);

    const { id: lessonId } = lesson.body.data;

    const singleLesson = await agent
      .get(`/api/lessons/${lessonId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(singleLesson.status).toBe(200);
    console.log('Lesson created:', singleLesson.body.data);
    const lessons = await agent
      .get('/api/lessons/')
      .set('Authorization', `Bearer ${token}`);
    expect(lessons.status).toBe(200);
  });
});
