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
    <section id="precios" className="py-20 bg-black relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-20 right-0 opacity-10">
        <div className="flex flex-col gap-4 rotate-45">
          <div className="h-1 w-40 bg-lime-400"></div>
          <div className="h-1 w-40 bg-lime-400"></div>
          <div className="h-1 w-40 bg-lime-400"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-lime-400 bg-lime-400/10">
            <span className="text-lime-400 tracking-wider">
              PLANES Y PRECIOS
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl mb-4 text-white">
            ELIGE TU <span className="text-lime-400">PLAN</span>
          </h2>

          <div className="h-1 w-40 bg-lime-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="p-8 relative overflow-hidden bg-gray-900 text-white border-2 border-gray-800 hover:border-lime-400 hover:scale-105 transition-all"
            >
              {/* Decoración esquina */}
              <div className="absolute top-0 left-0 flex gap-1 opacity-20">
                <ChevronRight className="w-8 h-8 text-lime-400" />
                <ChevronRight className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl mb-4 mt-6 uppercase tracking-wider">
                {plan.name}
              </h3>

              <div className="mb-8">
                <span className="text-5xl">$</span>
                <span className="text-6xl">{plan.price}</span>
                <span className="text-lg text-gray-400">
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-lime-400">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                 type="button" data-bs-toggle="modal" data-bs-target="#modalLogin"
                className="w-full py-4 bg-lime-400 text-black hover:bg-lime-500 transition uppercase tracking-wide"
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