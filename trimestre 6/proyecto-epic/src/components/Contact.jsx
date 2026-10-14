import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-[#111111] text-white relative overflow-hidden">
      
      {/* Decoración de fondo */}
      <div className="absolute top-10 right-20 opacity-10 rotate-45 pointer-events-none">
        <div className="flex flex-col gap-4">
          <div className="h-1 w-32 bg-[#99FF00]"></div>
          <div className="h-1 w-32 bg-[#99FF00]"></div>
          <div className="h-1 w-32 bg-[#99FF00]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-[#99FF00] bg-[#99FF00]/10 rounded-full">
            <span className="text-[#99FF00] font-semibold tracking-wider text-sm">CONTACTO</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            VISITA <span style={{ color: '#99FF00' }}>GYMZONE</span>
          </h2>

          <div className="h-1 w-32 bg-[#99FF00] mx-auto mb-4 rounded-full"></div>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Ven a conocer nuestras instalaciones y comienza tu transformación hoy mismo. ¡Escríbenos directamente!
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

          {/* Dirección */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-6 transition-all duration-300 hover:border-[#99FF00]/50 hover:shadow-[0_0_15px_rgba(153,255,0,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#99FF00] rounded-lg flex items-center justify-center mb-4 shadow-md">
                <MapPin className="w-7 h-7 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white uppercase tracking-wide">Dirección</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transversal 94 80a 29 <br />
                Bogotá, Colombia
              </p>
            </div>
          </div>

          {/* WhatsApp (Destacado como enlace interactivo) */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-6 transition-all duration-300 hover:border-[#99FF00]/50 hover:shadow-[0_0_15px_rgba(153,255,0,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#99FF00] rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Phone className="w-7 h-7 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white uppercase tracking-wide">WhatsApp</h3>
              <p className="text-gray-400 text-sm mb-4">
                ¿Tienes dudas con un plan o producto? Habla con nosotros al instante.
              </p>
            </div>
            
            {/* Botón enlace a WhatsApp claramente visible */}
            <a 
              href="https://api.whatsapp.com/send/?phone=573194794872&text=hola%20quiero%20un%20plan%20🏋🏿‍♀️&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02]"
              style={{ backgroundColor: '#25D366', color: '#ffffff' }}
            >
              <MessageCircle className="w-4 h-4" />
              ESCRIBIR AL WHATSAPP
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-6 transition-all duration-300 hover:border-[#99FF00]/50 hover:shadow-[0_0_15px_rgba(153,255,0,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#99FF00] rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Mail className="w-7 h-7 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white uppercase tracking-wide">Email</h3>
              <p className="text-gray-400 text-sm">
                info@gymzone.com
              </p>
            </div>
          </div>

          {/* Horario */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-6 transition-all duration-300 hover:border-[#99FF00]/50 hover:shadow-[0_0_15px_rgba(153,255,0,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#99FF00] rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Clock className="w-7 h-7 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white uppercase tracking-wide">Horario</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                <strong className="text-gray-300">Lun - Vie:</strong> 6:00AM - 10:00PM <br />
                <strong className="text-gray-300">Sábados:</strong> 8:00AM - 8:00PM <br />
                <strong className="text-gray-300">Domingos:</strong> 8:00AM - 6:00PM
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}