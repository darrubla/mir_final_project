import axios from "axios";

function transformTeacher(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
      subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      description: item.lesson?.description ?? "Unknown",
    },*/
  };
}

//API Agent
export async function getTeachers() {
  try {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/teachers/`
    );
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
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/teachers/${id}`
    );
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
    const { data: response } = await axios.post(
      `${import.meta.env.VITE_API_URL}/teachers/`,
      {
        payload,
      }
    );
    const data = transformTeacher(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
