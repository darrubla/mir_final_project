import http from './http';

function transformLesson(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    student: {
      name: item.student?.name ?? 'Unknown', // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      email: item.student?.email ?? 'Unknown',
    },
  };
}

//API Agent
export async function getLessons() {
  try {
    const { data: response } = await http.get(`/lessons/`);
    const data = response.data.map(transformLesson);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function getMyLessons() {
  try {
    const { data: response } = await http.get(`/lessons/`);
    const data = response.data.map(transformLesson);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function createLesson(payload) {
  try {
    const eventdate = new Date();
    payload = payload.lessonContent;
    console.log(payload);
    const { data: response } = await http.post(`/lessons/`, payload);
    const data = transformLesson(response.data);
    if (data?.id) {
      console.log(data.id);
      await http.post(`/lessonevents/`, {
        lessonId: data.id,
        date: eventdate,
        eventdesc: `Lesson ${data.id} was created`,
      });
    }

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function cancelClass(id) {
  try {
    const eventdate = new Date();
    const { data: response } = await http.put(`/lessons/${id}`, {
      status: 'Canceled',
      teacherId: null,
    });
    const data = transformLesson(response.data);
    await http.post(`/lessonevents/`, {
      lessonId: id,
      date: eventdate,
      eventdesc: `Lesson ${id} was canceled, status: 'Canceled'`,
    });
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function getAvailableLessons() {
  try {
    const { data: response } = await http.get(`/lessons/s`);
    const data = response.data.map(transformLesson);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function assignClass(id) {
  try {
    const eventdate = new Date();
    const { data: response } = await http.put(`/lessons/${id}/s`);
    const data = transformLesson(response.data);
    await http.post(`/lessonevents/`, {
      lessonId: id,
      date: eventdate,
      eventdesc: `Lesson ${id} was acepted, status: 'Scheduled'`,
    });
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function startClass(id) {
  try {
    const eventdate = new Date();
    const { data: response } = await http.put(`/lessons/${id}`, {
      status: 'Ongoing',
      startedAt: eventdate,
    });
    const data = transformLesson(response.data);
    await http.post(`/lessonevents/`, {
      lessonId: id,
      date: eventdate,
      eventdesc: `Lesson ${id} was started by student, status: 'Ongoing'`,
    });
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function finishClass(id) {
  try {
    const eventdate = new Date();
    const { data: response } = await http.put(`/lessons/${id}`, {
      status: 'Finished',
      finishedAt: eventdate,
    });
    const data = transformLesson(response.data);
    await http.post(`/lessonevents/`, {
      lessonId: id,
      date: eventdate,
      eventdesc: `Lesson ${id} was started by student, status: 'Ongoing'`,
    });
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
