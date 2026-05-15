import { X, MapPin, User, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Checkout({ isOpen, onClose, cartItems, total }) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [customerData, setCustomerData] = useState({
    fullName: "",
    phone: "",
    email: "",
    idNumber: "",
    idType: "CC"
  });

  if (!isOpen) return null;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerData.fullName || !customerData.phone || !customerData.email || !customerData.idNumber) {
      alert("Por favor completa todos los campos");
      return;
    }

    setIsProcessing(true);

    try {
      // Conexión con el servidor Node.js
      const response = await fetch("http://localhost:3001/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems, 
          payer: customerData
        }),
      });

      const data = await response.json();

      if (data.urlDePago) {
        // Redirige al checkout oficial de Mercado Pago
        window.location.href = data.urlDePago;
      } else {
        alert("Error al generar el link de pago.");
        setIsProcessing(false);
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor.");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCustomerData({
        fullName: "",
        phone: "",
        email: "",
        idNumber: "",
        idType: "CC"
      });
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl text-white mb-2">CHECKOUT <span className="text-lime-400">PAGO</span></h1>
            <p className="text-gray-400">Paga en línea y recoge tu pedido en el gimnasio</p>
          </div>
          <button onClick={handleClose} className="text-white hover:text-lime-400">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handlePaymentSubmit} className="bg-zinc-900 border-2 border-zinc-800 p-6">
              <h2 className="text-2xl text-white mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-lime-400" /> TU INFORMACIÓN
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  value={customerData.fullName}
                  onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                   <select 
                    value={customerData.idType}
                    onChange={(e) => setCustomerData({ ...customerData, idType: e.target.value })}
                    className="bg-zinc-950 border border-zinc-700 text-white p-3">
                     <option value="CC">CC</option>
                     <option value="CE">CE</option>
                   </select>
                   <input
                    type="text"
                    placeholder="Documento"
                    value={customerData.idNumber}
                    onChange={(e) => setCustomerData({ ...customerData, idNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white"
                  required
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-8 bg-lime-400 text-black py-4 font-bold text-lg hover:bg-lime-500 disabled:opacity-50"
              >
                {isProcessing ? "PROCESANDO..." : `PAGAR $${total.toLocaleString('es-CO')} COP`}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border-2 border-zinc-800 p-6">
              <h3 className="text-xl text-white mb-4">RESUMEN</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span className="text-white">{item.name} x{item.quantity}</span>
                  <span className="text-lime-400">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                </div>
              ))}
              <div className="border-t border-zinc-800 mt-4 pt-4 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-lime-400">${total.toLocaleString('es-CO')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}