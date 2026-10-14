import React from "react";
import { Check, ChevronRight } from "lucide-react";

const plans = [
  {
    name: "BÁSICO",
    price: "60.000",
    period: "mes",
    features: [
      "Acceso al gimnasio 24/7",
      "Área de pesas y cardio",
      "Vestuarios y duchas",
      "Wi-Fi gratuito",
      "App móvil de seguimiento",
    ],
  },
  {
    name: "PREMIUM",
    price: "80.000",
    period: "mes",
    features: [
      "Todo lo del plan Básico",
      "Clases grupales ilimitadas",
      "1 sesión de entrenamiento personal/mes",
      "Descuentos en nutrición",
      "Invitaciones para amigos",
    ],
  },
  {
    name: "ELITE",
    price: "100.000",
    period: "mes",
    features: [
      "Todo lo del plan Premium",
      "4 sesiones de entrenamiento personal/mes",
      "Plan nutricional personalizado",
      "Masajes deportivos mensuales",
      "Parking privado",
      "Toallas y amenities premium",
    ],
  },
  {
    name: "ANUAL ELITE",
    price: "900.000",
    period: "año",
    features: [
      "Todo lo del plan Elite",
      "Ahorra $300.000 al año",
      "12 meses por el precio de 9",
      "Sesiones de entrenamiento ilimitadas",
      "2 meses de plan nutricional GRATIS",
      "Evaluaciones físicas trimestrales",
    ],
  },
];

export default function Pricing({ onOpenAuth }) {
  return (
    <section id="precios" className="py-20 bg-[#111111] text-white relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-20 right-0 opacity-10 pointer-events-none">
        <div className="flex flex-col gap-4 rotate-45">
          <div className="h-1 w-40 bg-[#99FF00]"></div>
          <div className="h-1 w-40 bg-[#99FF00]"></div>
          <div className="h-1 w-40 bg-[#99FF00]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        
        {/* Cabecera de la sección */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-[#99FF00] bg-[#99FF00]/10 rounded-full">
            <span className="text-[#99FF00] tracking-wider font-semibold text-sm">
              PLANES Y PRECIOS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            ELIGE TU <span style={{ color: "#99FF00" }}>PLAN</span>
          </h2>

          <div className="h-1 w-32 bg-[#99FF00] mx-auto rounded-full"></div>
        </div>

        {/* Tarjetas de precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="p-8 relative overflow-hidden text-white rounded-xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333333",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#99FF00";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(153, 255, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333333";
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Decoración esquina */}
              <div className="absolute top-0 left-0 flex gap-1 opacity-20 pointer-events-none">
                <ChevronRight className="w-8 h-8" style={{ color: "#99FF00" }} />
                <ChevronRight className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 mt-4 uppercase tracking-wider text-white">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-3xl font-semibold align-top" style={{ color: "#99FF00" }}>$</span>
                  <span className="text-4xl lg:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400 ml-1">
                    /{plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded mt-0.5" style={{ backgroundColor: "#99FF00" }}>
                        <Check className="w-3.5 h-3.5 text-[#111111]" />
                      </div>
                      <span className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalLogin"
                className="w-full py-3.5 rounded-lg font-bold transition-all uppercase tracking-wider text-sm cursor-pointer"
                style={{
                  backgroundColor: "#99FF00",
                  color: "#111111",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#8ce600";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#99FF00";
                }}
              >
                Comenzar Ahora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}