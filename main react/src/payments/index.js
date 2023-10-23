const functionPayment = (orderData) => {
  const result = ''
  fetch('http://localhost:3000/create_preference', {
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
      result = preference
    })
    .catch((error) => {
      console.error(error)
    })
}

export default functionPayment
