import React, { useEffect, useState } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-e7644ceb-3393-4b1b-9cd7-da8f2bd89593', { locale: 'es-CO' });

const Checkout = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const crearPreferencia = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/create-preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                title: "Membresía Gym",
                quantity: 1,
                unit_price: 10000,
                currency_id: "COP", 
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        setPreferenceId(data.id);
      } catch (err) {
        console.error("Error al crear la preferencia:", err);
        setError("No se pudo conectar con el servidor de pagos.");
      }
    };

    crearPreferencia();
  }, []);

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId }}
          customization={{ texts: { valueProp: 'smart_option' } }}
        />
      )}
      {!preferenceId && !error && <p>Cargando opciones de pago...</p>}
    </div>
  );
};

export default Checkout;