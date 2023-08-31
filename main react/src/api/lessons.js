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

export async function createLesson(payload) {
  payload = payload.lessonContent;
  payload = JSON.stringify({
    ...payload,
    studentId: "891ab06b-84ae-4d27-bd49-076e9e84c7de",
  });
  const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
  });
  console.log(payload);
  if (response.ok) {
    const json = await response.json();
    const data = json.data; // transformLesson(json.data);
    return {
      data,
    };
  } else {
    console.log(response);
    return Promise.reject("Network error");
  }
}
