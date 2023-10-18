import http from './http.js';
import { setSession } from './session';

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
    const { data: response } = await http.post('/teachers/signin/teacher', {
      email,
      password,
    });
    const { data, meta } = response;
    const { token = '' } = meta;

    setSession(token);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
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
    return Promise.reject(error);
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
    return Promise.reject(error);
  }
}

export async function signUpTeacher(payload) {
  try {
    const { data: response } = await http.post(
      `/teachers/signup/teacher`,
      payload,
    );
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
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
    return Promise.reject(error);
  }
}
export async function addSubject({ subjectId }) {
  try {
    const { data: response } = await http.post(`/subjectsonteachers/`, {
      subjectId,
    });
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function deleteSubject({ subjectId }) {
  try {
    const { data: response } = await http.delete(
      `/subjectsonteachers/${subjectId}`,
    );
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function activateTeacher(token) {
  try {
    const { data: response } = await http.get(
      `/teachers/activate_teacher/${token}`,
    );
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function confirmTeacher(email) {
  try {
    const { data: response } = await http.post(
      `/teachers/confirmation_teacher`,
      {
        email,
      },
    );
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function voteTeacher(id) {
  try {
    const { data: result } = await http.get(`/teachers/${id}`);
    const currentPoints = result.data.points;
    const { data: response } = await http.put(`/teachers/${id}`, {
      points: currentPoints + 1,
    });
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
