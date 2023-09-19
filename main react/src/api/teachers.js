import http from "./http.js";
import { setSession } from "./session";

function transformTeacher(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
      subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      description: item.lesson?.description ?? "Unknown",
    },*/
  };
}

export async function signInTeacher({ email, password }) {
  try {
    const { data: response } = await http.post("/teachers/signin/teacher", {
      email,
      password,
    });
    const { data, meta } = response;
    const { token = "" } = meta;

    setSession(token);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
//API Agent
export async function getTeachers() {
  try {
    const { data: response } = await http.get(`/teachers/`);
    const data = response.data.map(transformTeacher);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function getTeacher({ id }) {
  try {
    const { data: response } = await http.get(`/teachers/${id}`);
    const data = transformTeacher(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function createTeacher(payload) {
  try {
    // payload = payload.lessonContent;
    const { data: response } = await http.post(`/teachers/`, {
      payload,
    });
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
