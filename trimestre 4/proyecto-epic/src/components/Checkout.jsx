import { X, MapPin, User, Phone, Mail, Building, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Checkout({ isOpen, onClose, cartItems, total, onPaymentSuccess }) {
  const [step, setStep] = useState("info");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [customerData, setCustomerData] = useState({
    fullName: "",
    phone: "",
    email: "",
    idNumber: "",
    idType: "CC"
  });

  const [pseData, setPseData] = useState({
    bank: "",
    personType: "natural" // natural o juridica
  });

  if (!isOpen) return null;

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (!customerData.fullName || !customerData.phone || !customerData.email || !customerData.idNumber) {
      return;
    }
    setStep("pse");
  };

  const handlePSESubmit = async (e) => {
    e.preventDefault();
    
    if (!pseData.bank) {
      return;
    }

    setIsProcessing(true);

    // Simulación de procesamiento de pago PSE
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 3000);
  };

  const handleClose = () => {
    if (step === "success") {
      onPaymentSuccess();
    }
    onClose();
    setTimeout(() => {
      setStep("info");
      setCustomerData({
        fullName: "",
        phone: "",
        email: "",
        idNumber: "",
        idType: "CC"
      });
      setPseData({
        bank: "",
        personType: "natural"
      });
    }, 300);
  };

  // Lista de bancos de Colombia
  const banks = [
    "Bancolombia",
    "Banco de Bogotá",
    "Davivienda",
    "BBVA Colombia",
    "Banco de Occidente",
    "Banco Popular",
    "Banco AV Villas",
    "Banco Caja Social",
    "Banco Agrario",
    "Banco GNB Sudameris",
    "Banco Pichincha",
    "Banco Falabella",
    "Banco Cooperativo Coopcentral",
    "Banco Santander",
    "Scotiabank Colpatria",
    "Citibank",
    "Itaú",
    "Nequi"
  ];

  return (
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl text-white mb-2">
              CHECKOUT <span className="text-lime-400">PSE</span>
            </h1>
            <p className="text-gray-400">Paga y recoge tu pedido en el gimnasio</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-lime-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Success Screen */}
        {step === "success" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900 border-2 border-lime-400 p-8 text-center">
              <CheckCircle className="w-24 h-24 text-lime-400 mx-auto mb-6" />
              <h2 className="text-3xl text-white mb-4">
                ¡PAGO <span className="text-lime-400">EXITOSO!</span>
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Tu pedido ha sido procesado correctamente
              </p>

              <div className="bg-zinc-950 border border-lime-400 p-6 mb-6 text-left">
                <h3 className="text-xl text-lime-400 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  INFORMACIÓN DE RECOGIDA
                </h3>
                <div className="space-y-3 text-white">
                  <div>
                    <p className="text-gray-400 text-sm">Ubicación:</p>
                    <p className="text-lg">GYMZONE</p>
                    <p>Transversal 94 80a 29, Bogotá</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Nombre:</p>
                    <p>{customerData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total pagado:</p>
                    <p className="text-lime-400 text-xl">${total.toLocaleString('es-CO')} COP</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-700 p-4 mb-6">
                <h4 className="text-white mb-2">Resumen del pedido:</h4>
                <div className="space-y-2 text-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-400">
                      <span>{item.name} {item.variant && `(${item.variant})`} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-lime-400 text-black py-3 hover:bg-lime-500 transition-colors"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        {step !== "success" && (
          <>
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className={`flex items-center gap-2 ${step === "info" ? "text-lime-400" : "text-white"}`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  step === "info" ? "border-lime-400 bg-lime-400/20" : "border-white bg-white/20"
                }`}>
                  1
                </div>
                <span className="hidden md:inline">Información</span>
              </div>
              <div className="h-px w-16 bg-zinc-700"></div>
              <div className={`flex items-center gap-2 ${step === "pse" ? "text-lime-400" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  step === "pse" ? "border-lime-400 bg-lime-400/20" : "border-zinc-700 bg-zinc-900"
                }`}>
                  2
                </div>
                <span className="hidden md:inline">Pago PSE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2">
                {/* Info Form */}
                {step === "info" && (
                  <form onSubmit={handleInfoSubmit} className="bg-zinc-900 border-2 border-zinc-800 p-6">
                    <h2 className="text-2xl text-white mb-6 flex items-center gap-2">
                      <User className="w-6 h-6 text-lime-400" />
                      TU INFORMACIÓN
                    </h2>

                    <div className="bg-lime-400/10 border border-lime-400 p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-lime-400 mb-1">Recogida en el gimnasio</p>
                          <p className="text-white text-sm">Transversal 94 80a 29, Bogotá</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          value={customerData.fullName}
                          onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-sm block mb-2">Tipo de Documento *</label>
                          <select
                            value={customerData.idType}
                            onChange={(e) => setCustomerData({ ...customerData, idType: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                          >
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                            <option value="TI">Tarjeta de Identidad</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm block mb-2">Número de Documento *</label>
                          <input
                            type="text"
                            value={customerData.idNumber}
                            onChange={(e) => setCustomerData({ ...customerData, idNumber: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                            placeholder="1234567890"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-sm block mb-2">
                            <Phone className="w-4 h-4 inline mr-2" />
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            value={customerData.phone}
                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                            placeholder="+57 300 123 4567"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm block mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email *
                          </label>
                          <input
                            type="email"
                            value={customerData.email}
                            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                            placeholder="correo@ejemplo.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 bg-lime-400 text-black py-3 hover:bg-lime-500 transition-colors"
                    >
                      CONTINUAR AL PAGO PSE
                    </button>
                  </form>
                )}

                {/* PSE Form */}
                {step === "pse" && (
                  <form onSubmit={handlePSESubmit} className="bg-zinc-900 border-2 border-zinc-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl text-white flex items-center gap-2">
                        <Building className="w-6 h-6 text-lime-400" />
                        PAGO CON PSE
                      </h2>
                      <button
                        type="button"
                        onClick={() => setStep("info")}
                        className="text-lime-400 hover:text-lime-300 text-sm"
                      >
                        ← Volver
                      </button>
                    </div>

                    <div className="bg-zinc-950 border border-lime-400 p-6 mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Building className="w-6 h-6 text-lime-400 flex-shrink-0" />
                        <div>
                          <p className="text-white mb-2">Pago Seguro Electrónico</p>
                          <p className="text-gray-400 text-sm">
                            PSE es el servicio que permite realizar pagos en línea de forma segura a través de tu banco.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Tipo de Persona</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setPseData({ ...pseData, personType: "natural" })}
                            className={`p-4 border-2 transition-all ${
                              pseData.personType === "natural"
                                ? "border-lime-400 bg-lime-400/10"
                                : "border-zinc-700 hover:border-zinc-600"
                            }`}
                          >
                            <User className="w-6 h-6 mx-auto mb-2 text-lime-400" />
                            <p className="text-white text-sm">Persona Natural</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPseData({ ...pseData, personType: "juridica" })}
                            className={`p-4 border-2 transition-all ${
                              pseData.personType === "juridica"
                                ? "border-lime-400 bg-lime-400/10"
                                : "border-zinc-700 hover:border-zinc-600"
                            }`}
                          >
                            <Building className="w-6 h-6 mx-auto mb-2 text-lime-400" />
                            <p className="text-white text-sm">Persona Jurídica</p>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm block mb-2">
                          Selecciona tu Banco *
                        </label>
                        <select
                          value={pseData.bank}
                          onChange={(e) => setPseData({ ...pseData, bank: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white focus:border-lime-400 focus:outline-none"
                          required
                        >
                          <option value="">-- Selecciona tu banco --</option>
                          {banks.map((bank) => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-700 p-4">
                        <p className="text-white text-sm mb-2">Datos de pago:</p>
                        <div className="space-y-1 text-gray-400 text-xs">
                          <p>Nombre: {customerData.fullName}</p>
                          <p>{customerData.idType}: {customerData.idNumber}</p>
                          <p>Email: {customerData.email}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing || !pseData.bank}
                      className="w-full mt-6 bg-lime-400 text-black py-3 hover:bg-lime-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          REDIRIGIENDO A TU BANCO...
                        </>
                      ) : (
                        <>
                          <Building className="w-5 h-5" />
                          PAGAR ${total.toLocaleString('es-CO')} COP CON PSE
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-900 border-2 border-zinc-800 p-6 sticky top-8">
                  <h3 className="text-xl text-white mb-4">RESUMEN DEL PEDIDO</h3>
                  
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="text-white">{item.name}</p>
                          {item.variant && (
                            <p className="text-gray-400 text-xs">{item.variant}</p>
                          )}
                          <p className="text-gray-400">x{item.quantity}</p>
                        </div>
                        <p className="text-lime-400">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 pt-4 space-y-2">
                    <div className="flex justify-between text-white">
                      <span>Total</span>
                      <span className="text-lime-400 text-xl">
                        ${total.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Recoge tu pedido en:</p>
                        <p className="text-white text-sm">GYMZONE</p>
                        <p className="text-gray-400 text-xs">Transversal 94 80a 29</p>
                        <p className="text-gray-400 text-xs">Bogotá</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}