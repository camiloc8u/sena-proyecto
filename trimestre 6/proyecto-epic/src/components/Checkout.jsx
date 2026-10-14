import { X, User, ShoppingCart } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#333333]">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              CHECKOUT <span style={{ color: "#99FF00" }}>PAGO</span>
            </h1>
            <p className="text-gray-400 text-sm">Paga en línea de forma segura y recoge tu pedido en el gimnasio</p>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-[#1a1a1a] border border-[#333333] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario de información */}
          <div className="lg:col-span-2">
            <form 
              onSubmit={handlePaymentSubmit} 
              className="p-6 md:p-8 rounded-xl shadow-xl"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333" }}
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#111111] border border-[#333333]">
                  <User className="w-5 h-5" style={{ color: "#99FF00" }} />
                </div>
                TU INFORMACIÓN
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Ej. Camilo Morales"
                    value={customerData.fullName}
                    onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-all"
                    style={{ backgroundColor: "#111111", border: "1px solid #333333" }}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Tipo ID</label>
                    <select 
                      value={customerData.idType}
                      onChange={(e) => setCustomerData({ ...customerData, idType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-all"
                      style={{ backgroundColor: "#111111", border: "1px solid #333333" }}
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Número de Documento</label>
                    <input
                      type="text"
                      placeholder="Ej. 1000000000"
                      value={customerData.idNumber}
                      onChange={(e) => setCustomerData({ ...customerData, idNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-all"
                      style={{ backgroundColor: "#111111", border: "1px solid #333333" }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-all"
                    style={{ backgroundColor: "#111111", border: "1px solid #333333" }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Teléfono / Celular</label>
                  <input
                    type="tel"
                    placeholder="Ej. 3194794872"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-all"
                    style={{ backgroundColor: "#111111", border: "1px solid #333333" }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-8 font-bold py-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#99FF00", color: "#111111" }}
                onMouseEnter={(e) => !isProcessing && (e.currentTarget.style.backgroundColor = "#8ce600")}
                onMouseLeave={(e) => !isProcessing && (e.currentTarget.style.backgroundColor = "#99FF00")}
              >
                <ShoppingCart className="w-5 h-5" />
                {isProcessing ? "PROCESANDO PAGO..." : `PAGAR $${total.toLocaleString('es-CO')} COP`}
              </button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div 
              className="p-6 rounded-xl shadow-xl sticky top-6"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333" }}
            >
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Resumen del Pedido</h3>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm pb-3 border-b border-[#222222]">
                    <span className="text-gray-300 pr-2">
                      {item.name} <span className="text-xs font-bold" style={{ color: "#99FF00" }}>x{item.quantity}</span>
                    </span>
                    <span className="text-white font-semibold whitespace-nowrap">
                      ${(item.price * item.quantity).toLocaleString('es-CO')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#333333] flex justify-between items-center text-lg font-bold">
                <span className="text-white">Total a pagar</span>
                <span style={{ color: "#99FF00" }}>${total.toLocaleString('es-CO')} COP</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}