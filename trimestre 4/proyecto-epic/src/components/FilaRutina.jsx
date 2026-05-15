import { useState } from "react"
import logo from "../assets/logo.png";

function FilaRutina({dia, rutina, ejercicio}){
    const [completado, setCompletado] = useState(false);

    return (
        <div className="card d-flex flex-row align-items-center p-3 mb-2" 
                        style={{
                    backgroundColor: "#000000", 
                    border: `2px solid ${completado ? "#7CFC00" : "#333333"}`, 
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                    cursor: "pointer"
                     }}
                     onClick={() => setCompletado (!completado)}
                    >
                 <img
                 className="me-3"
                 style={{ width: "40px", height: "40px", objectFit: "contain" }}
            src={logo}
             alt="logo"
                />
            <div className="d-flex flex-column me-auto">
            <h6 className="text-white fw-bold mb-0">{dia}</h6>
            <small className="text-white text-opacity-50">{ejercicio}</small>
            </div>
            <button
            className=" btn-sm px-4"
            style={{ 
             border: `2px solid ${completado ? "#fc0000" : "#7CFC00"}`, 
             color: completado ? "#fc0000" : "#7CFC00",
            backgroundColor: completado ? "transparent" : "transparent",
            textTransform: "uppercase" 
            }}
                    onClick={() => setCompletado(!completado)}
                >
                    {completado ? "Cancelar" : "Marcar Completado"}
                </button>
                </div>
    );
}
export default FilaRutina