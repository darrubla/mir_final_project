function transformTeacher(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    teacher: {
      name: item.student?.name ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      email: item.student?.email ?? "Unknown",
    },
  };
}

//API Agent
export async function getTeachers() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/teachers/`);
  if (response.ok) {
    const json = await response.json();
    const data = json.data.map(transformTeacher);
    return {
      data,
      meta: json.meta,
    };
  } else {
    return Promise.reject("Network error");
  }
}

export async function getTeacher({ id }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/teachers/${id}`);
  if (response.ok) {
    const json = await response.json();
    const data = transformTeacher(json.data);
    return {
      data,
    };
  } else {
    return Promise.reject("Network error");
  }
}
