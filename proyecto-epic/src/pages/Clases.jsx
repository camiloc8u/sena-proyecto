import SidebarCliente from "../components/dashboard/SidebarCliente";
import { useState} from "react";
import ReservarClases from "../components/ReservarClases";
import Swal from "sweetalert2";

function Clases({setVista}){
   const [verReservar, setVerReservar] = useState(false);

  const [clasesReservadas, setClasesReservadas] = useState([

  ]);

    const cancelarClase = (id) => {
      Swal.fire({
        title: "¿Cancelar clase?",
        background: "#151922",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setClasesReservadas((prev) =>
            prev.filter((c) => c.id !== id)
          );
        }
      });
    };

  // 🔥 ESTA ES LA CLAVE
  const agregarReserva = (clase) => {
    setClasesReservadas((prev) => [...prev, clase]);
    setVerReservar(false);
  };
    return(
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

        <main className="p-4 row g-4 w-500 col-md-8">
      {/* 🔹 VISTA 1 */}
      {!verReservar && (
        <>
          <h2 className="text-white">CLASES RESERVADAS</h2>

{clasesReservadas.map((clase, i) => (
  <div
    key={i}
    className="d-flex justify-content-between align-items-center p-3 mb-3"
    style={{
      backgroundColor: "#0b0f17",
      border: "1px solid #2a2f3a",
      borderRadius: "6px",
    }}
  >
    {/* 🔹 IZQUIERDA */}
    <div className="d-flex align-items-center gap-3">
      
      <div>
        <h5 className="text-white m-0">{clase.nombre}</h5>
        <p className="text-secondary m-0">
          {clase.horario} • {clase.instructor}
        </p>
      </div>

    </div>

    {/* 🔹 BOTÓN */}
    <button
      onClick={() => cancelarClase(clase.id)}
      style={{
        border: "2px solid red",
        color: "red",
        backgroundColor: "transparent",
        padding: "8px 16px",
        borderRadius: "4px",
        fontWeight: "bold",
      }}
    >
      CANCELAR
    </button>
  </div>
))}

          <button
          className="btn-sm px-4"
          onClick={() => setVerReservar(true)}
          style={{
            backgroundColor: "transparent",
            color: "#7CFC00",
            border: "2px solid #A2FF00"
          }}>
            RESERVAR NUEVA CLASE
          </button>
        </>
      )}

      {/* 🔹 VISTA 2 */}
      {verReservar && (
        <ReservarClases agregarReserva={agregarReserva} />
      )}

    </main>
      </div>
    </div>

    )
}
export default Clases