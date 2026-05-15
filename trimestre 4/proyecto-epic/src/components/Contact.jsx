import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-black relative overflow-hidden">
      
      {/* Decoración */}
      <div className="absolute top-10 right-20 opacity-10 rotate-45">
        <div className="flex flex-col gap-4">
          <div className="h-1 w-32 bg-lime-400"></div>
          <div className="h-1 w-32 bg-lime-400"></div>
          <div className="h-1 w-32 bg-lime-400"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        
        {/* Título */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-lime-400 bg-lime-400/10">
            <span className="text-lime-400 tracking-wider">CONTACTO</span>
          </div>

          <h2 className="text-5xl md:text-6xl mb-4 text-white">
            VISITA <span className="text-lime-400">GYMZONE</span>
          </h2>

          <div className="h-1 w-40 bg-lime-400 mx-auto mb-4"></div>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Ven a conocer nuestras instalaciones y comienza tu transformación hoy mismo
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

          <div className="bg-gray-900 border-2 border-gray-800 p-6">
            <div className="w-16 h-16 bg-lime-400 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl mb-3 text-white uppercase">Dirección</h3>
            <p className="text-gray-400">
              Transversal 94 80a 29 <br />
              Bogotá, Colombia
            </p>
          </div>

          <div className="bg-gray-900 border-2 border-gray-800 p-6">
            <div className="w-16 h-16 bg-lime-400 flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl mb-3 text-white uppercase">Teléfono</h3>
            <p className="text-gray-400">+57 123 456 789</p>
          </div>

          <div className="bg-gray-900 border-2 border-gray-800 p-6">
            <div className="w-16 h-16 bg-lime-400 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl mb-3 text-white uppercase">Email</h3>
            <p className="text-gray-400">info@gymzone.com</p>
          </div>

          <div className="bg-gray-900 border-2 border-gray-800 p-6">
            <div className="w-16 h-16 bg-lime-400 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl mb-3 text-white uppercase">Horario</h3>
            <p className="text-gray-400">
              Lunes - Viernes: 6:00AM - 10:00PM <br />
              Sábados: 8:00AM - 8:00PM <br />
              Domingos: 8:00AM - 6:00PM
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}