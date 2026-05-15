import { useState } from "react";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import Rutinas from "./pages/Rutinas";
import Progreso from "./pages/Progreso";
import Clases from "./pages/Clases";
import NavbarAdmin from "./components/admin/NavbarAdmin";
import "./globals.css";

function App() {
  const [vista, setVista] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (!usuarioGuardado || !token) return "home";

    try {
      const usuario = JSON.parse(usuarioGuardado);

if (usuario.rol === "admin") return "Administrador"; 
if (usuario.rol === "cliente") return "Cliente";

      return "home";
    } catch (error) {
      return "home";
    }
  });

  return (
    <>
      {vista === "home" && <Home setVista={setVista} />}
      {vista === "Cliente" && <ClienteDashboard setVista={setVista} />}
      {vista === "rutinas" && <Rutinas setVista={setVista} />}
      {vista === "progreso" && <Progreso setVista={setVista} />}
      {vista === "clases" && <Clases setVista={setVista} />}
      {vista === "Administrador" && <AdminDashboard setVista={setVista} />}
      {vista === "adminNav" && <NavbarAdmin setVista={setVista} />}
    </>
  );
}

export default App;
