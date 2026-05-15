import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SidebarCliente from "../components/dashboard/SidebarCliente";
import CambiarPlan from "../components/CambiarPlan";


function ClienteDashboard({ setVista }) {
  const [perfil, setPerfil] = useState ([null]);
  const [planActual, setPlanActual] = useState("PREMIUM");
  const [verPlanes, setVerPlanes] = useState(false);
  const API_URL = "https://69c2c5f37518bf8facbf7620.mockapi.io/Usuario"
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioLocal && usuarioLocal.id) {
      fetch(`${API_URL}/${usuarioLocal.id}`)
        .then((res) => res.json())
        .then((data) => setPerfil(data))
        .catch((error) => console.error("Error al cargar perfil:", error));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setVista("home");
  };
    const editarPerfil = async () => {
    const { value: formValues } = await Swal.fire({
    
      title: "Editar perfil",
      border: "#7CFC00",
      background: "#151922",
      color: "#ffffff",
      
      html:
        `<label class="text-white">NOMBRE</label>` +
        `<input id="swal-nombre" class="swal2-input" value="${perfil.nombre || ""}">` +
        `<label class="text-white">EMAIL</label>` +
        `<input id="swal-email" class="swal2-input" value="${perfil.email || ""}">` +
        `<label class="text-white">TELÉFONO</label>` +
        `<input id="swal-telefono" class="swal2-input" value="${perfil.telefono || ""}">`,
        confirmButtonColor: "#7CFC00",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `cancelar`,
      focusConfirm: false,
      
      preConfirm: () => {
        return {
          nombre: document.getElementById("swal-nombre").value,
          email: document.getElementById("swal-email").value,
          telefono: document.getElementById("swal-telefono").value,
        };
      },
    });
      <swal-button type="cancel">
    Cancel
  </swal-button>


    if (formValues) {
      fetch(`${API_URL}/${perfil.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((actualizado) => {
          setPerfil(actualizado); 
          Swal.fire({
            background: "#151922",
            title: "Actualizado",
            icon: "success",
            confirmButtonColor: "#7CFC00"
          });
        })
        .catch((error) => console.error("Error al editar:", error));
    }
  };

  if (!perfil) return <div className="text-white p-5">Cargando...</div>;

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
    const cambiarPlan = (plan) => {
      setPlanActual(plan.nombre);
      setVerPlanes(false);

      Swal.fire({
        background: "#151922",
        title: `Ahora tienes el plan ${plan.nombre}`,
        icon: "success",
        confirmButtonColor: "#7CFC00"
      });
    };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#000000" }}>
      <SidebarCliente setVista={setVista} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header className="d-flex flex-row justify-content-between align-items-center bg-dark text-white px-4" style={{ height: 150 }}>
          <div style={{ display: "flex" }}>
            <h3 className="text-white">AREA DE </h3>
            <h3 className="ms-2" style={{ color: "#7CFC00" }}>USUARIO</h3>
          </div>

          <div className="d-flex justify-content-end" style={{ height: "50%" }}>
            <button
              className="btn btn-dark btn-sm"
              style={{ backgroundColor: "transparent", border: "2px solid #A2FF00", color: "#A2FF00" }}
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="p-4">
          <div className="row g-4 mb-4 d-flex justify-content-center">
            <div className="col-md-4">
              <div className="card bg-dark border-secondary">
                <div className="card-body">
                  <h5 className="fw-bold text-white text-center">{perfil.nombre || "Usuario"}</h5>
                  <p className=" text-white text-center opacity-50 small">{perfil.email}</p>
                  
                  <ul className="list-unstyled mt-3">
                    <li className="d-flex justify-content-between border-bottom border-secondary border-opacity-25 py-3 text-white">
                      <span>Teléfono:</span> <span>{perfil.telefono || "No asignado"}</span>
                    </li>
                    <li className="d-flex justify-content-between border-bottom border-secondary border-opacity-25 py-3 text-white">
                      <span >Miembro desde:</span>
                      <span>{perfil.miembroDesde || "Enero 2024"}</span>
                    </li>
                    <li className="d-flex justify-content-between border-bottom border-secondary border-opacity-25 py-3 text-white">
                      <span>Plan actual:</span>
                      <span 
                      style={{color: "#A2FF00"}}>{perfil.miembroDesde || "PREMIUM"}</span>
                    </li>
                    <li className="d-flex justify-content-between border-bottom border-secondary border-opacity-25 py-3 text-white">
                      <span>Sesiones restantes:</span>
                      <span>{perfil.miembroDesde || "3"}</span>
                    </li>
                    <li className="d-flex justify-content-center">
                      <button
                        className="btn mt-3 w-100"
                        style={{ backgroundColor: "transparent", border: "2px solid #A2FF00", color: "#A2FF00" }}
                        onClick={editarPerfil}
                      >
                        EDITAR PERFIL
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            
            <div className="col-md-4">
              <div className="card bg-dark ">
                <div className="card-body bg-gray-800">
                  <h5 className="fw-bold text-white">PLANES</h5>

                      <p className="text-center mt-3" style={{ color: "#A2FF00", fontWeight: "bold" }}>
                        {planActual}
                      </p>
                      
                      {verPlanes && (
                        <CambiarPlan agregarReserva={cambiarPlan} />
                      )}
                      <li className="d-flex justify-content-center" >
                      <button className="btn mt-3 w-100 "
                      onClick={() => setVerPlanes(true)}
                      style={{backgroundColor:"transparent", border: "2px solid #A2FF00", color: "#A2FF00"}}
                     >CAMBIAR PLAN</button>
                    </li>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClienteDashboard;