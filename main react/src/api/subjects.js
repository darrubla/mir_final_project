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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects/`);
  if (response.ok) {
    const json = await response.json();
    const data = json.data.map(transformSubject);
    return {
      data,
      meta: json.meta,
    };
  } else {
    return Promise.reject("Network error");
  }
}

export async function getSubject({ id }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subjects/${id}`
  );
  if (response.ok) {
    const json = await response.json();
    const data = transformSubject(json.data);
    return {
      data,
    };
  }
  if (response.status === 404) {
    return Promise.reject("Not Found");
  }
  return Promise.reject("Network error");
}

export async function getSubjectId({ subjectname }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subjects/n/${subjectname}`
  );
  if (response.ok) {
    const json = await response.json();
    const data = transformSubject(json.data);
    return {
      data,
    };
  }
  if (response.status === 404) {
    return Promise.reject("Not Found");
  }
  return Promise.reject("Network error");
}
