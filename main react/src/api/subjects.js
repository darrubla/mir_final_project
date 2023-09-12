import axios from "axios";

function transformSubject(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
        subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
        description: item.lesson?.description ?? "Unknown",
      },*/
  };
}

//API Agent
export async function getSubjects() {
  try {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/subjects/`
    );
    const data = response.data.map(transformSubject);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function getSubject({ id }) {
  try {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/subjects/${id}`
    );
    const data = transformSubject(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}

export async function getSubjectId({ subjectname }) {
  try {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/subjects/n/${subjectname}`
    );
    const data = transformSubject(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.response.data.error.message);
  }
}
