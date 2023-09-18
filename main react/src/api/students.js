import http from "./http";

function transformStudent(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
      subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      description: item.lesson?.description ?? "Unknown",
    },*/
  };
}

export async function signIn({ email, password }) {
  try {
    const { data: response } = await http.post("/students/signin/student", {
      email,
      password,
    });
    const { data } = response;

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
//API Agent
export async function getStudents() {
  try {
    const { data: response } = await http.get(`/students/`);
    const data = response.data.map(transformStudent);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function getStudent({ id }) {
  try {
    const { data: response } = await http.get(`/students/${id}`);
    const data = transformStudent(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function createStudent(payload) {
  try {
    // payload = payload.lessonContent;
    const { data: response } = await http.post(`/students/`, {
      payload,
    });
    const data = transformStudent(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
