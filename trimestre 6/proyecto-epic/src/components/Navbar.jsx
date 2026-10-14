import { Menu, X, Dumbbell } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onOpenAuth }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-[#333333]">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#333333]">
              <Dumbbell className="w-6 h-6" style={{ color: "#99FF00" }} />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              Gym<span style={{ color: "#99FF00" }}>Zone</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-gray-300 hover:text-[#99FF00] transition-colors text-sm font-medium">Inicio</a>
            <a href="#servicios" className="text-gray-300 hover:text-[#99FF00] transition-colors text-sm font-medium">Servicios</a>
            <a href="#rutinas" className="text-gray-300 hover:text-[#99FF00] transition-colors text-sm font-medium">Rutinas</a>
            <a href="#precios" className="text-gray-300 hover:text-[#99FF00] transition-colors text-sm font-medium">Precios</a>
            <a href="#menu" className="text-gray-300 hover:text-[#99FF00] transition-colors text-sm font-medium">Menú</a>
            <a href="#contacto" className="text-gray-300 hover:text-[#99FF00] transition-colors text-sm font-medium">Contacto</a>
            
            <button 
              className="font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md cursor-pointer" 
              style={{ backgroundColor: "#99FF00", color: "#111111" }}
              data-bs-toggle="modal"
              data-bs-target="#modalLogin" 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#8ce600"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#99FF00"}
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg bg-[#1a1a1a] border border-[#333333]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-[#99FF00]" /> : <Menu className="w-6 h-6 text-[#99FF00]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 pt-2 flex flex-col gap-4 border-t border-[#333333] animate-fadeIn">
            <a href="#inicio" className="text-gray-300 hover:text-[#99FF00] transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a href="#servicios" className="text-gray-300 hover:text-[#99FF00] transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a href="#rutinas" className="text-gray-300 hover:text-[#99FF00] transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Rutinas</a>
            <a href="#precios" className="text-gray-300 hover:text-[#99FF00] transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Precios</a>
            <a href="#menu" className="text-gray-300 hover:text-[#99FF00] transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Menú</a>
            <a href="#contacto" className="text-gray-300 hover:text-[#99FF00] transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            
            <button 
              type="button" 
              data-bs-toggle="modal" 
              data-bs-target="#modalLogin"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 rounded-lg font-bold text-center mt-2"
              style={{ backgroundColor: "#99FF00", color: "#111111" }}
            >
              Iniciar Sesión / Únete
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}