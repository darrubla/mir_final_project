import http from "./http";

function transformLesson(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    student: {
      name: item.student?.name ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      email: item.student?.email ?? "Unknown",
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
    payload = payload.lessonContent;
    console.log(payload);
    const { data: response } = await http.post(`/lessons/`, payload);
    const data = transformLesson(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function cancelClass(id) {
  try {
    console.log(id);
    const { data: response } = await http.put(`/lessons/${id}`, {
      status: "Canceled",
      teacherId: null,
    });
    const data = transformLesson(response.data);
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
