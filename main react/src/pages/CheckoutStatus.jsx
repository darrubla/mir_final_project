import { useLocation } from 'react-router-dom'

import { StatusScreen } from '@mercadopago/sdk-react'

export default function CheckoutStatus() {
  const location = useLocation()

  const onError = async (error) => {
    // callback llamado solicitada para todos los casos de error de Brick
    console.log(error)
  }
  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  }

  if (location?.state?.paymentId) {
    const initialization = {
      paymentId: location.state.paymentId, // id de pago para mostrar
    }

    const customization = {
      visual: {
        showExternalReference: true,
      },
      backUrls: {
        error: `${import.meta.env.VITE_BASE_URL}/checkout`,
        return: `${import.meta.env.VITE_BASE_URL}/`,
      },
    }

    return (
      <StatusScreen
        initialization={initialization}
        customization={customization}
        onReady={onReady}
        onError={onError}
      />
    )
  }

  return null
}
