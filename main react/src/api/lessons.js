import axios from "axios";

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
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/lessons/`
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
    const { data: response } = await axios.post(
      `${import.meta.env.VITE_API_URL}/lessons/`,
      {
        ...payload,
        studentId: "b84f6be4-51ec-4b38-9a0e-106e7c5a6685",
      }
    );
    const data = transformLesson(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
