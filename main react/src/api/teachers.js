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
    console.log(email, password);
    const { data: response } = await http.post("/teachers/signin/teacher", {
      email,
      password,
    });
    const { data, meta } = response;
    const { token = "" } = meta;
    console.log(data);
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

export async function signUpTeacher({ name, lastname, email, age, password }) {
  try {
    const { data: response } = await http.post(`/teachers/signup/teacher`, {
      name,
      lastname,
      email,
      age,
      password,
    });
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function getMe() {
  try {
    const { data: response } = await http.get(`/teachers/me`);
    const data = transformTeacher(response.data);
    return {
      data,
      //meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function addSubject({ subjectId }) {
  try {
    //console.log({ subjectId });
    const { data: response } = await http.post(`/subjectsonteachers/`, {
      subjectId,
    });
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
export async function deleteSubject({ subjectId }) {
  try {
    const { data: response } = await http.delete(
      `/subjectsonteachers/${subjectId}`
    );
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
