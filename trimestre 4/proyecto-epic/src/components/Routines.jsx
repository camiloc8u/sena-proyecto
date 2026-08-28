import { Dumbbell, Zap, Target, TrendingUp, Activity, Timer } from "lucide-react";

export default function Routines() {
  const routines = [
    {
      icon: Dumbbell,
      name: "FUERZA",
      description: "Construcción muscular y potencia",
      duration: "45-60 min",
      level: "Todos los niveles",
      highlights: [
        "Press de banca y sentadillas",
        "Peso muerto y dominadas",
        "Desarrollo de masa muscular",
        "Progresión constante"
      ]
    },
    {
      icon: Zap,
      name: "HIIT",
      description: "Alta intensidad para quemar grasa",
      duration: "30-40 min",
      level: "Intermedio - Avanzado",
      highlights: [
        "Intervalos de alta intensidad",
        "Quema de grasa acelerada",
        "Mejora cardiovascular",
        "Metabolismo elevado 24/7"
      ]
    },
    {
      icon: Target,
      name: "FUNCIONAL",
      description: "Movimientos naturales del cuerpo",
      duration: "45 min",
      level: "Todos los niveles",
      highlights: [
        "Ejercicios con peso corporal",
        "Kettlebells y TRX",
        "Mejora de movilidad",
        "Prevención de lesiones"
      ]
    },
    {
      icon: TrendingUp,
      name: "CROSSFIT",
      description: "Entrenamiento de élite",
      duration: "60 min",
      level: "Avanzado",
      highlights: [
        "WODs diseñados por coaches",
        "Comunidad competitiva",
        "Fuerza y resistencia",
        "Variedad constante"
      ]
    },
    {
      icon: Activity,
      name: "CARDIO",
      description: "Resistencia y salud cardiovascular",
      duration: "30-45 min",
      level: "Todos los niveles",
      highlights: [
        "Cinta, bici y remo",
        "Clases de spinning",
        "Quema de calorías",
        "Mejora de resistencia"
      ]
    },
    {
      icon: Timer,
      name: "CIRCUITO",
      description: "Combinación perfecta de todo",
      duration: "45 min",
      level: "Intermedio",
      highlights: [
        "Estaciones rotativas",
        "Cardio + Fuerza",
        "Trabajo en grupo",
        "Resultados rápidos"
      ]
    }
  ];

  return (
    <section id="rutinas" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-4 border-lime-400 rotate-45 opacity-10"></div>
      <div className="absolute bottom-20 left-10 w-1 h-60 bg-lime-400 rotate-[-30deg] opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 border-4 border-lime-400 opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-lime-400 bg-lime-400/10">
            <span className="text-lime-400 tracking-wider">ENTRENA CON PROPÓSITO</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            NUESTRAS <span className="text-lime-400">RUTINAS</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-20 bg-lime-400"></div>
            <p className="text-gray-400 uppercase tracking-wide">
              Programas diseñados para resultados
            </p>
            <div className="h-1 w-20 bg-lime-400"></div>
          </div>
        </div>

        {/* Routines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routines.map((routine, index) => {
            const Icon = routine.icon;
            return (
              <div
                key={index}
                className="group relative bg-zinc-900 border-2 border-zinc-800 hover:border-lime-400 transition-all duration-300 overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/0 to-lime-400/0 group-hover:from-lime-400/10 group-hover:to-lime-400/5 transition-all duration-300"></div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-lime-400/10 -mr-10 -mt-10 rotate-45 group-hover:bg-lime-400/20 transition-all"></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6 inline-block p-4 bg-lime-400/10 border-2 border-lime-400 group-hover:bg-lime-400 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-lime-400 group-hover:text-black" strokeWidth={2.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl text-white mb-2 group-hover:text-lime-400 transition-colors">
                    {routine.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4">
                    {routine.description}
                  </p>

                  {/* Info */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-zinc-800">
                    <div>
                      <p className="text-lime-400 text-sm">DURACIÓN</p>
                      <p className="text-white">{routine.duration}</p>
                    </div>
                    <div className="border-l border-zinc-800 pl-4">
                      <p className="text-lime-400 text-sm">NIVEL</p>
                      <p className="text-white">{routine.level}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {routine.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 bg-lime-400 rotate-45 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom stripe */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6 text-lg">
            ¿No sabes por dónde empezar? Nuestros coaches diseñarán el plan perfecto para ti
          </p>
          <a 
            href="#precios" 
            className="inline-block border-2 border-lime-400 text-lime-400 px-10 py-4 hover:bg-lime-400 hover:text-black transition-all"
          >
            COMIENZA HOY
          </a>
        </div>
      </div>
    </section>
  );
}
