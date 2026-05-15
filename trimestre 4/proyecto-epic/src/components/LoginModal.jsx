import { useState } from "react";
import Swal from "sweetalert2";

function LoginModal({ setVista }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
    
      const respuesta = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
   
        body: JSON.stringify({ correo, password }),
      });

      const data = await respuesta.json();

      
      if (data.exito) {
        const usuarioEncontrado = data.usuario;

        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        const token = `jwt-${usuarioEncontrado.rol}-${Date.now()}`;
        localStorage.setItem("token", token);

        document.getElementById("cerrarModalLogin").click();
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "auto";

        Swal.fire({
          icon: "success",
          theme: "dark",
          title: "Inicio exitoso",
          confirmButtonColor: "#9ff567",
          timer: 1500,
          showConfirmButton: false,
        });


        setVista(usuarioEncontrado.rol);
      } else {
        Swal.fire({
          icon: "error",
          theme: "dark",
          title: "Error",
          text: data.mensaje || "Correo o contraseña incorrectos",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        theme: "dark",
        title: "Error de conexión",
        text: "No es posible conectarse al servidor",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="modalLogin"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 ">
          <div className="modal-header justify-content-center ">
            <h5 className="modal-title fw-bold text-white text-center">
              Iniciar Sesión
            </h5>
            <button
              id="cerrarModalLogin"
              className="btn-close position-absolute end-0 m-3"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={manejarLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-secondary">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  id="email"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label text-secondary">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" type="submit">Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;