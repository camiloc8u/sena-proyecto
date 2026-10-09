function TopbarAdmin({ setVista}) {
const cerrarSesion = () =>{

  localStorage.removeItem("usuario");
  setVista("home")
};


  return (
    <header className="bg-white shadow-sm px-4 py-3 d-flex justify-content-between align-items-center">
      
      <h5 className="mb-0 fw-bold text-danger">
        Panel de Administración
      </h5>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">Admin</span>

        <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

    </header>
  );
}

export default TopbarAdmin;