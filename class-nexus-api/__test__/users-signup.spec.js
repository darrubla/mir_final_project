import request from 'supertest';

import { app } from '../app/index.js';
import { getStudent } from './fixtures/student.fixture.js';
import { getLesson } from './fixtures/lesson.fixture.js';
import { resetDb } from './helpers/reset-db.js';
import { beforeEach, expect } from 'vitest';
import { getSubject } from './fixtures/subject.fixture.js';
import { getTeacher } from './fixtures/teacher.fixture.js';

describe('Users Sign Up', () => {
  beforeEach(async () => {
    await resetDb();
  });
  test('signed successfully', async () => {
    const agent = request(app);

    const {
      name: names,
      lastname: lastnames,
      email: emails,
      age: ages,
    } = getStudent();

    const passwords = '12345678';
    const { description, scheduledAt, site } = getLesson();
    const { subjectname } = getSubject();

    const student = await agent.post('/api/students/signup/student').send({
      name: names,
      lastname: lastnames,
      email: emails,
      age: ages,
      password: passwords,
    });
    expect(student.status).toBe(201);

    const loginS = await agent.post('/api/students/signin/student').send({
      email: emails,
      password: passwords,
    });

    expect(loginS.status).toBe(200);

    const subject = await agent.post('/api/subjects').send({
      subjectname,
    });

    expect(subject.status).toBe(201);

    const { id: subjectId } = subject.body.data;

    const tokenS = loginS.body.meta.token;

    const lesson = await agent
      .post('/api/lessons')
      .send({
        description,
        scheduledAt,
        site,
        subjectId,
      })
      .set('Authorization', `Bearer ${tokenS}`);

    expect(lesson.status).toBe(201);

    const { id: lessonId } = lesson.body.data;

    const singleLesson = await agent
      .get(`/api/lessons/${lessonId}`)
      .set('Authorization', `Bearer ${tokenS}`);

    expect(singleLesson.status).toBe(200);
    console.log('Lesson created:', singleLesson.body.data);

    const {
      name: namet,
      lastname: lastnamet,
      email: emailt,
      age: aget,
      points,
    } = getTeacher();
    const passwordt = '12345678';

    const teacher = await agent.post('/api/teachers/signup/teacher').send({
      name: namet,
      lastname: lastnamet,
      email: emailt,
      age: aget,
      password: passwordt,
      points,
    });
    expect(teacher.status).toBe(201);

    const loginT = await agent.post('/api/teachers/signin/teacher').send({
      email: emailt,
      password: passwordt,
    });

    expect(loginT.status).toBe(200);

    const tokenT = loginT.body.meta.token;

    const assign = await agent
      .put(`/api/lessons/${lessonId}/s`)
      .send({
        status: 'Scheduled',
      })
      .set('Authorization', `Bearer ${tokenT}`);

    expect(assign.status).toBe(200);
    const singleLessonUpdated = await agent
      .get(`/api/lessons/${lessonId}`)
      .set('Authorization', `Bearer ${tokenS}`);

    expect(singleLessonUpdated.status).toBe(200);
    console.log('Lesson updated:', singleLessonUpdated.body.data);

    const lessons = await agent
      .get('/api/lessons/')
      .set('Authorization', `Bearer ${tokenS}`);
    expect(lessons.status).toBe(200);
  });
});
