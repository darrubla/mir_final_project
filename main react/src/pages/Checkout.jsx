import { useContext, useEffect, useState } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// import { createPreference } from '../api/checkout'
import { useNavigate } from 'react-router-dom';

import '../styles/checkout.scss';
import UserContext from '../containers/UserContext';
import { Container } from 'react-bootstrap';

initMercadoPago(import.meta.env.VITE_PAYMENT_API_KEY, { locale: 'es-CO' });

const Checkout = () => {
  const { user } = useContext(UserContext);

  const [preferenceId, setPreferenceId] = useState('');

  const navigate = useNavigate();
  const initialization = {
    id: 'MLB2907679857',
    title: 'Math class',
    description: 'Class Nexus',
    quantity: 1,
    unit_price: 58000,
    type: 'lessons',
    category_descriptor: {
      passenger: {},
      route: {},
    },
  };
  const customization = {
    visual: {
      defaultPaymentOption: {
        creditCardForm: true,
      },
    },
    paymentMethods: {
      bankTransfer: 'all',
      creditCard: 'all',
      debitCard: 'all',
      minInstallments: 1,
      maxInstallments: 3,
    },
    statement_descriptor: 'Class Nexus',
  };

  useEffect(() => {
    new Promise((resolve, reject) => {
      fetch(`${import.meta.env.VITE_API_URL}/payments/preference_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialization),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          setPreferenceId(response.preferenceId);
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          console.error('error: ', error);
          reject();
        });
    });
  }, []);

  const onSubmit = async ({ formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_PAYMENT_API_TOKEN}`,
        },
        body: JSON.stringify({
          ...formData,
          additional_info: {
            items: [{ ...initialization }],
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // recibir el resultado del pago
          navigate('/payment_status', {
            state: {
              paymentId: response.id,
            },
          });
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          console.error('error: ', error);
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
      Test
    */
  };

  if (!preferenceId) {
    return null;
  }
  if (user?.email && user.type === 'student') {
    return (
      <Container fluid="xxl">
        <Payment
          initialization={{
            preferenceId: preferenceId,
            amount: 10000,
          }}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      </Container>
    );
  }
};

export default Checkout;
