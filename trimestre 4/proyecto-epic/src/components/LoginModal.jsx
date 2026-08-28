import { useState } from "react";
import Swal from "sweetalert2";

function LoginModal({ setVista }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

const manejarLogin = async (e) => {
  e.preventDefault();

  try {
    // 1. Hacemos un GET a /usuarios para obtener la lista
    const respuesta = await fetch("http://localhost:5000/usuarios");
    
    if (!respuesta.ok) throw new Error("Error en el servidor");

    const usuarios = await respuesta.json();

    // 2. Buscamos el usuario que coincida con correo y contraseña
    // Usamos .trim() para evitar errores por espacios accidentales
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.trim() === correo.trim() && u.password === password
    );

    if (usuarioEncontrado) {
      // 3. ÉXITO: Guardamos datos
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      const token = `jwt-${usuarioEncontrado.rol}-${Date.now()}`;
      localStorage.setItem("token", token);

      // Limpieza de UI (Modales de Bootstrap)
      const botonCerrar = document.getElementById("cerrarModalLogin");
      if (botonCerrar) botonCerrar.click();
      
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();

      Swal.fire({
        icon: "success",
        title: "Inicio exitoso",
        text: `Bienvenido, ${usuarioEncontrado.nombre}`,
        confirmButtonColor: "#9ff567",
        timer: 1500,
        showConfirmButton: false,
      });

      // IMPORTANTE: Cambiamos la vista según el rol del JSON
      setVista(usuarioEncontrado.rol); 

    } else {
      // 4. FALLO: Datos no coinciden
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "El correo o la contraseña no coinciden.",
        confirmButtonColor: "#dc3545",
      });
    }
  } catch (error) {
    console.error("Detalle del error:", error);
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "Asegúrate de que 'json-server' esté corriendo en el puerto 5000",
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