import SidebarCliente from "../components/dashboard/SidebarCliente";
import { TrendingUp } from "lucide-react";
function Progreso({setVista}){
  
    const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setVista("home");
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

        <main className="p-4 row g-4 w-500 d-flex">
        <div className="col-md-3">
          <div className="card" style={{backgroundColor: "#151922", borderColor: "gray"}}>
            <div className="card-body ms-3">
              <TrendingUp color="#7CFC00" />
              <p className="text-white">Entrenamientos este mes</p>
              <h1 className="text-white">2 <span className="" style={{fontSize: "20px", color:"#7CFC00"}}>+2</span></h1>
            </div>
          </div>
        </div>
              <div className="col-md-3">
          <div className="card" style={{backgroundColor: "#151922", borderColor: "gray"}}>
            <div className="card-body ms-3">
              <TrendingUp color="#7CFC00" />
              <p className="text-white">Calorias quemadas</p>
              <h1 className="text-white">1.404</h1>
            </div>
          </div>
        </div>
            <div className="col-md-3">
          <div className="card" style={{backgroundColor: "#151922", borderColor: "gray"}}>
            <div className="card-body ms-3">
              <TrendingUp color="#7CFC00" />
              <p className="text-white">Tiempo total</p>
              <h1 className="text-white">3h <span className="" style={{fontSize: "20px", color:"#7CFC00"}}>+1.5h</span></h1>
            </div>
          </div>
        </div>
          <div className="col-md-3">
          <div className="card" style={{backgroundColor: "#151922", borderColor: "gray"}}>
            <div className="card-body ms-3">
              <TrendingUp color="#7CFC00" />
              <p className="text-white">Racha actual</p>
              <h1 className="text-white">2 días 🔥</h1>
            </div>
          </div>
        </div>
          <div className="col-md-12 ">
          <div className="card" style={{backgroundColor: "#151922", borderColor: "gray", height: 400}}>
            <div className="card-body ms-3 py-3">
              <h3 className="text-white">EVOLUCION MENSUAL</h3>
            </div>
            <div className="d-flex justify-content-between px-4 mt-auto mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((mes) => (
                <p key={mes} className="text-white mb-0 small">
                  {mes}
                </p>
              ))}
            </div> 
          </div>
        </div>
        </main>
      </div>
    </div>
    )
}
export default Progreso