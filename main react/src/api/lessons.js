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
    const { data: response } = await http.get(
      `/students/bcbbbffc-69c9-4435-937c-4889c61c82d5/lessons`
    );
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
    const { data: response } = await http.post(`/lessons/`, payload);
    const data = transformLesson(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
