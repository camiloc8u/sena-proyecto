import { useState } from "react";
import Swal from "sweetalert2";

function LoginModal({ setVista }) {
  // Estado para controlar qué sección se muestra ('login', 'pedir-correo', 'verificar-codigo')
  const [paso, setPaso] = useState("login");

  // Estados para Login
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  // Estados para Recuperación de Contraseña
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const theme = {
    surface: '#1a1a1a', 
    text: '#ffffff',
    primary: '#99FF00', 
    border: '#333333',
    inputBg: '#222222'
  };

  // Manejador del Login
  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          background: theme.surface,
          color: theme.text,
          title: "Inicio exitoso",
          confirmButtonColor: theme.primary,
          timer: 1500,
          showConfirmButton: false,
        });

        setVista(usuarioEncontrado.rol);
      } else {
        Swal.fire({
          icon: "error",
          background: theme.surface,
          color: theme.text,
          title: "Error",
          text: data.mensaje || "Correo o contraseña incorrectos",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        background: theme.surface,
        color: theme.text,
        title: "Error de conexión",
        text: "No es posible conectarse al servidor",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  // Paso 1: Enviar correo para solicitar el código de recuperación
  const solicitarCodigo = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await fetch("http://localhost:3001/api/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correoRecuperacion })
      });
      const data = await res.json();

      if (data.exito) {
        Swal.fire({
          icon: "success",
          background: theme.surface,
          color: theme.text,
          title: "¡Código generado!",
          text: "Revisa la consola de tu servidor backend para ver el código.",
          confirmButtonColor: theme.primary,
        });
        setPaso("verificar-codigo");
      } else {
        throw new Error(data.mensaje);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        background: theme.surface,
        color: theme.text,
        title: "Error",
        text: error.message || "No se pudo procesar la solicitud.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setCargando(false);
    }
  };

  // Paso 2: Enviar código y nueva contraseña al backend
  const cambiarPasswordFinal = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await fetch("http://localhost:3001/api/cambiar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          correo: correoRecuperacion, 
          codigo: codigoIngresado, 
          nuevaPassword 
        })
      });
      const data = await res.json();

      if (data.exito) {
        Swal.fire({
          icon: "success",
          background: theme.surface,
          color: theme.text,
          title: "¡Contraseña actualizada!",
          text: "Ya puedes iniciar sesión con tu nueva contraseña.",
          confirmButtonColor: theme.primary,
        });
        setPaso("login");
        setCorreoRecuperacion("");
        setCodigoIngresado("");
        setNuevaPassword("");
      } else {
        throw new Error(data.mensaje);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        background: theme.surface,
        color: theme.text,
        title: "Código incorrecto",
        text: error.message || "El código es inválido o ha expirado.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setCargando(false);
    }
  };

  const cerrarModalCompleto = () => {
    setPaso("login");
    setCorreo("");
    setPassword("");
    setCorreoRecuperacion("");
    setCodigoIngresado("");
    setNuevaPassword("");
  };

  return (
    <>
      <style>
        {`
          .gym-input::placeholder {
            color: #666666 !important;
          }
          .gym-input:focus {
            background-color: #2a2a2a !important;
            border-color: #99FF00 !important;
            box-shadow: 0 0 8px rgba(153, 255, 0, 0.25) !important;
            color: white !important;
            outline: none;
          }
          .gym-btn {
            transition: all 0.3s ease;
          }
          .gym-btn:hover {
            background-color: #8ce600 !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(153, 255, 0, 0.4);
          }
        `}
      </style>

      <div className="modal fade" id="modalLogin" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          
          <div className="modal-content border-0" style={{ backgroundColor: theme.surface, borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.8)' }}>
            
            <div className="modal-header border-0 pb-0 justify-content-center mt-4 position-relative">
              <h5 className="modal-title fw-bold text-center" style={{ color: theme.primary, letterSpacing: '1px' }}>
                {paso === "login" && "INICIAR SESIÓN"}
                {paso === "pedir-correo" && "RECUPERAR CONTRASEÑA"}
                {paso === "verificar-codigo" && "NUEVA CONTRASEÑA"}
              </h5>
              <button
                id="cerrarModalLogin"
                className="btn-close btn-close-white position-absolute end-0 top-0 m-4"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ opacity: 0.5 }}
                onClick={cerrarModalCompleto}
              ></button>
            </div>

            <div className="modal-body p-4 p-md-5 pt-3">
              
              {/* VISTA 1: LOGIN */}
              {paso === "login" && (
                <form onSubmit={manejarLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#aaaaaa', fontSize: '14px' }}>
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control gym-input"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      id="email"
                      placeholder="ejemplo@gymzone.com"
                      required
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.text, padding: '14px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#aaaaaa', fontSize: '14px' }}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control gym-input"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.text, padding: '14px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="text-center mb-4">
                    <button
                      type="button"
                      onClick={() => setPaso("pedir-correo")}
                      className="btn btn-link p-0 text-decoration-none"
                      style={{ color: '#888888', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = theme.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#888888'}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <div className="d-grid mt-2">
                    <button 
                      className="btn fw-bold gym-btn" 
                      type="submit"
                      style={{ backgroundColor: theme.primary, color: '#111', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '16px', letterSpacing: '0.5px' }}
                    >
                      INGRESAR
                    </button>
                  </div>
                </form>
              )}

              {/* VISTA 2: PEDIR CORREO DE RECUPERACIÓN */}
              {paso === "pedir-correo" && (
                <form onSubmit={solicitarCodigo}>
                  <p className="text-sm mb-4 text-center" style={{ color: '#aaaaaa' }}>
                    Ingresa tu correo registrado en el sistema para generar el código de recuperación.
                  </p>

                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{ color: '#aaaaaa', fontSize: '14px' }}>
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control gym-input"
                      value={correoRecuperacion}
                      onChange={(e) => setCorreoRecuperacion(e.target.value)}
                      placeholder="ejemplo@gymzone.com"
                      required
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.text, padding: '14px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      className="btn fw-bold gym-btn" 
                      type="submit"
                      disabled={cargando}
                      style={{ backgroundColor: theme.primary, color: '#111', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '15px' }}
                    >
                      {cargando ? "GENERANDO..." : "OBTENER CÓDIGO"}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaso("login")}
                      className="btn btn-link text-decoration-none text-secondary mt-2"
                      style={{ fontSize: '13px' }}
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                </form>
              )}

              {/* VISTA 3: INGRESAR CÓDIGO Y NUEVA CONTRASEÑA */}
              {paso === "verificar-codigo" && (
                <form onSubmit={cambiarPasswordFinal}>
                  <p className="text-sm mb-4 text-center" style={{ color: '#aaaaaa' }}>
                    Revisa la consola de tu servidor y escribe el código de 6 dígitos para <strong style={{ color: '#fff' }}>{correoRecuperacion}</strong>.
                  </p>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#aaaaaa', fontSize: '14px' }}>
                      Código de verificación
                    </label>
                    <input
                      type="text"
                      className="form-control gym-input text-center fs-4 tracking-widest"
                      value={codigoIngresado}
                      onChange={(e) => setCodigoIngresado(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      required
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.text, padding: '10px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{ color: '#aaaaaa', fontSize: '14px' }}>
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control gym-input"
                      value={nuevaPassword}
                      onChange={(e) => setNuevaPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.text, padding: '14px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      className="btn fw-bold gym-btn" 
                      type="submit"
                      disabled={cargando}
                      style={{ backgroundColor: theme.primary, color: '#111', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '15px' }}
                    >
                      {cargando ? "GUARDANDO..." : "CAMBIAR CONTRASEÑA"}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaso("pedir-correo")}
                      className="btn btn-link text-decoration-none text-secondary mt-1"
                      style={{ fontSize: '13px' }}
                    >
                      Volver a pedir código
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;