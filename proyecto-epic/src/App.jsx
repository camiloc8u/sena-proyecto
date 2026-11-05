import { useState } from "react";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import Entrenador from "./components/entrenador/Entrenador"; 
import Rutinas from "./pages/Rutinas";
import Progreso from "./pages/Progreso";
import Clases from "./pages/Clases";
import NavbarAdmin from "./components/admin/NavbarAdmin";
import Tienda from "./pages/Tienda";
import "./globals.css";

function App() {
  const [vista, setVista] = useState(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    const token = sessionStorage.getItem("token");
    const tokenTimestamp = sessionStorage.getItem("token_time");

    if (!usuarioGuardado || !token) return "home";

    // Opcional: Validar límite de tiempo (Ejemplo: expira en 2 horas = 7200000 ms)
    const tiempoLimite = 2 * 60 * 60 * 1000; 
    if (tokenTimestamp && Date.now() - Number(tokenTimestamp) > tiempoLimite) {
      // Si el tiempo expiró, limpiamos la sesión de esta pestaña
      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("token_time");
      return "home";
    }
    try {
      const usuario = JSON.parse(usuarioGuardado);

      if (usuario.rol === "admin") return "Administrador"; 
      if (usuario.rol === "cliente") return "Cliente";
      if (usuario.rol === "entrenador") return "Entrenador";

      return "home";
    } catch (error) {
      return "home";
    }
  });

  return (
    <>
      {vista === "home" && <Home setVista={setVista} />}
      {vista === "Cliente" && <ClienteDashboard setVista={setVista} />}
      {vista === "Entrenador" && <Entrenador setVista={setVista} />}
      {vista === "rutinas" && <Rutinas setVista={setVista} />}
      {vista === "progreso" && <Progreso setVista={setVista} />}
      {vista === "clases" && <Clases setVista={setVista} />}
      {vista === "Administrador" && <AdminDashboard setVista={setVista} />}
      {vista === "adminNav" && <NavbarAdmin setVista={setVista} />}
      {vista === "tienda" && <Tienda cartItems={carrito} setVista={setVista} />}
      {vista === "tienda" && <Tienda setVista={setVista} />} 
    </>
  );
}

export default App;