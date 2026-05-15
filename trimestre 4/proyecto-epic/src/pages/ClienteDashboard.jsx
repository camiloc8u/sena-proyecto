import SidebarCliente from "../components/dashboard/SidebarCliente";
import TablaProductos from "../components/dashboard/TablaProductos";

function ClienteDashboard({ setVista }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setVista("home");
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#000000" }}
    >
      <SidebarCliente />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header className="d-flex  flex-row justify-content-between align-items-center bg-dark text-white px-4" style={{height: 150}}>
            <div style={{display: "flex"}} >
            <h3 className="fw-bold text-white">AREA DE  
            </h3> <h3 className="fw-bold ms-2" style={{color: "#7CFC00"}}>USUARIO</h3>

          </div>


          <div className="d-flex justify-content-end " style={{ height: "100%" }}>
            <button className="btn btn-dark btn-sm"
            style={{color: "#7CFC00"}}
            onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="p-4">

          <div className="row g-4 mb-4 w-500 d-flex justify-content-center">
            <div className="col-md-4 ">
              <div className="card bg-dark">
                <div className="card-body bg-gray-800 "> 
                  <h5 className="fw-bold text-white text-center">camilo Morales</h5>
                  <p className="text-white mb-0 text-center">
                    bienvenido
                  </p>
                  <ul className="list-unstyled ">
                    <li className="text-white">Telefono: </li>
                    <li className="text-white">Miembro desde: </li>
                    <li className="text-white">Plan actual: </li>
                    <li className="text-white">Proximo pago: </li>
                    <li className="text-white">Sesiones restantes: </li>
                  </ul>


                </div>
              </div>
            </div>

            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm  ">
                <div className="card-body">
                  <h5 className="fw-bold text-white">Membresias</h5>
                  <p className="text-muted mb-0">
                    Consulta el estado de tus pedidos y haz seguimiento a tus compras.
                  </p>
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