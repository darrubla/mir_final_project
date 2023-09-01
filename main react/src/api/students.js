function transformStudent(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
      subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      description: item.lesson?.description ?? "Unknown",
    },*/
  };
}

//API Agent
export async function getStudents() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/students/`);
  if (response.ok) {
    const json = await response.json();
    const data = json.data.map(transformStudent);
    return {
      data,
      meta: json.meta,
    };
  } else {
    return Promise.reject("Network error");
  }
}

export async function getStudent({ id }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${id}`
  );
  if (response.ok) {
    const json = await response.json();
    const data = transformStudent(json.data);
    return {
      data,
    };
  }
  if (response.status === 404) {
    return Promise.reject("Not Found");
  }
  return Promise.reject("Network error");
}
