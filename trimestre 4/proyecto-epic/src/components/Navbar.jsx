import { Menu, X, Dumbbell } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onOpenAuth }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-lime-500/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-lime-400" />
            <span className="text-xl text-white">
              Gym<span className="text-lime-400">Zone</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-gray-300 hover:text-lime-400 transition-colors">Inicio</a>
            <a href="#servicios" className="text-gray-300 hover:text-lime-400 transition-colors">Servicios</a>
            <a href="#rutinas" className="text-gray-300 hover:text-lime-400 transition-colors">Rutinas</a>
            <a href="#precios" className="text-gray-300 hover:text-lime-400 transition-colors">Precios</a>
            <a href="#menu" className="text-gray-300 hover:text-lime-400 transition-colors">Menú</a>
            <a href="#contacto" className="text-gray-300 hover:text-lime-400 transition-colors">Contacto</a>
            <button className="text-black" 
              style={{backgroundColor:"#98eb01", height:"40px"}}
              data-bs-toggle="modal"
              data-bs-target="#modalLogin" 
              >Unete ahora</button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#inicio" className="text-gray-300 hover:text-lime-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a href="#servicios" className="text-gray-300 hover:text-lime-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a href="#rutinas" className="text-gray-300 hover:text-lime-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Rutinas</a>
            <a href="#precios" className="text-gray-300 hover:text-lime-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Precios</a>
            <a href="#menu" className="text-gray-300 hover:text-lime-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Menú</a>
            <a href="#contacto" className="text-gray-300 hover:text-lime-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            <button type="button" data-bs-toggle="modal" data-bs-target="#modalLogin">
              Únete Ahora
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
