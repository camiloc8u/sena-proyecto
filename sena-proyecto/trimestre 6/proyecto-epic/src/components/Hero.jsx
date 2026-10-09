import { ChevronRight } from "lucide-react";

export default function Hero({ onOpenAuth }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Decoración */}
      <div className="absolute top-20 left-10 w-20 h-20 border-4 border-lime-400 rotate-45 opacity-20"></div>

      <div className="absolute top-40 right-20 opacity-20">
        <ChevronRight className="w-24 h-24 text-lime-400" strokeWidth={4} />
        <ChevronRight className="w-24 h-24 text-white absolute -right-8 top-0" strokeWidth={4} />
      </div>

      <div className="absolute bottom-40 left-20 w-1 h-40 bg-lime-400 rotate-45"></div>

      {/* Imagen fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1620188467120-5042ed1eb5da"
          alt="Gym fitness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <h1 className="text-6xl md:text-8xl mb-6 max-w-4xl mx-auto">
          TRANSFORMA TU <span className="text-lime-400">CUERPO</span>
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-1 w-20 bg-lime-400"></div>
          <p className="text-xl md:text-2xl text-gray-300 uppercase tracking-wide">
            Entrena como un profesional
          </p>
          <div className="h-1 w-20 bg-lime-400"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a
            href="#precios"
            className="border-2 border-lime-400 text-lime-400 px-10 py-4 hover:bg-lime-400 hover:text-black transition-all"
          >
            VER PLANES
          </a>

          {/* BOTÓN LOGIN opcional */}
          <button
            onClick={onOpenAuth}
            className="bg-lime-400 text-black px-10 py-4 hover:bg-lime-500 transition-all"
          >
            ÚNETE AHORA
          </button>
        </div>
      </div>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-2 opacity-30">
        <div className="h-2 w-20 bg-lime-400 skew-x-[-45deg]"></div>
        <div className="h-2 w-20 bg-lime-400 skew-x-[-45deg]"></div>
        <div className="h-2 w-20 bg-lime-400 skew-x-[-45deg]"></div>
      </div>

    </section>
  );
}