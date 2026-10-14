import SidebarCliente from "../components/dashboard/SidebarCliente";
import logo from "../assets/logo.png";
import FilaRutina from "../components/FilaRutina";
import { useState } from "react";

function Rutinas({ setVista }) { 
  const [encendido, setEncendido] = useState(false);

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#000000" }}
    >
      <SidebarCliente setVista={setVista} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          className="d-flex flex-row justify-content-between align-items-center bg-dark text-white px-4"
          style={{ height: 150 }}
        >
          <div className="d-flex">
            <h3 className="text-white">AREA DE</h3>
            <h3 className="ms-2" style={{ color: "#7CFC00" }}>
              USUARIO
            </h3>
          </div>
        </header>

        <main className="p-4">
        <h5 className="fw-bold text-white mb-3">RUTINA SEMANAL</h5>
  
        <FilaRutina dia="Lunes" ejercicio="FUERZA - Tren Superior" logo={logo} />
        <FilaRutina dia="Martes" ejercicio="HIIT - Quema de Grasa" logo={logo} />
        <FilaRutina dia="Miércoles" ejercicio="FUNCIONAL - Movilidad" logo={logo} />
        <FilaRutina dia="Jueves" ejercicio="FUERZA - Tren Interior" logo={logo} />
        <FilaRutina dia="Viernes" ejercicio="CARDIO - Resistencia" logo={logo} />
        <FilaRutina dia="Sabado" ejercicio="CIRCUITO - Full Body" logo={logo} />
        </main>
      </div>
    </div>
  );
}

export default Rutinas;