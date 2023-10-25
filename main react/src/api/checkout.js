export const createPreference = (orderData) => {
  let result = ''
  fetch('http://localhost:3000/api/create_preference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      return response.json()
    })
    .then((preference) => {
      result = preference.id
    })
    .catch((error) => {
      console.error('error: ', error)
    })
  return result
}
