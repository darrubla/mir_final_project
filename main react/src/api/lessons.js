function transformLesson(item = {}) {
  return {
    ...item,// Copia todas las propiedades
    student: {
      name: item.student?.name ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      email: item.student?.email ?? "Unknown",
    },
  };
}

//API Agent
export async function getLessons() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/`);
  if (response.ok) {
    const json = await response.json();
    const data = json.data.map(transformLesson);
    return {
      data,
      meta: json.meta,
    };
  } else {
    return Promise.reject("Network error");
  }
}
