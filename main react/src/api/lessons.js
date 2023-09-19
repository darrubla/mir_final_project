import http from "./http";
import { getSession } from "./session";

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

export async function createLesson(payload) {
  try {
    const token = getSession();
    payload = payload.lessonContent;
    const { data: response } = await http.post(`/lessons/`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = transformLesson(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
