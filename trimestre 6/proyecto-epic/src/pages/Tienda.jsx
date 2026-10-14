import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';

// Inicializa con tu PUBLIC KEY
initMercadoPago('APP_USR-e7644ceb-3393-4b1b-9cd7-da8f2bd89593');

export default function Tienda({ cartItems }) {
  const [preferenceId, setPreferenceId] = useState(null);

  const handleCheckout = async () => {
    const items = cartItems.map(item => ({
      title: item.name,
      unit_price: Number(item.price), // IMPORTANTE: Number()
      quantity: Number(item.quantity), // IMPORTANTE: Number()
      currency_id: "COP"
    }));

    const response = await fetch("http://localhost:3000/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();
    if (data.id) setPreferenceId(data.id);
  };

  return (
    <div>
      <button onClick={handleCheckout}>Pagar Carrito</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}