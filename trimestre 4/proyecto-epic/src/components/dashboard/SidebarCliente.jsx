<<<<<<< HEAD
function SidebarCliente({setVista}) {
=======
function SidebarCliente() {
>>>>>>> origin/samuel
  return (
    <aside
      className="bg-dark text-white p-4 "
      style={{ width: "260px",minWidth:"260px", maxWidth:"260px", minHeight: "100vh" }}
    >
<<<<<<< HEAD
      <h1 className="navbar-brand fw-bold text-white" href="#">Gym<span className="resaltado">zone</span></h1>
=======
      <h4 className="fw-bold text-danger mb-4">Pizza Nostra</h4>
>>>>>>> origin/samuel

      <p className="text-uppercase small text-secondary mb-2">Cliente</p>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
<<<<<<< HEAD
          <button 
          onClick={() => setVista("Cliente")}
          className="nav-link active text-white ">
            MI PERFIL
          </button>
        </li>

        <li className="nav-item mb-2">
        <button 
          onClick={() => setVista("rutinas")} 
          className="nav-link text-white " 
        >
          MIS RUTINAS
        </button>
        </li>

        <li className="nav-item mb-2">
          <button 
          onClick={() => setVista("progreso")} 
          className="nav-link text-white" 
        >
          MI PROGRESO
        </button>
        </li>

        <li className="nav-item mb-2">
        <button 
          onClick={() => setVista("clases")} 
          className="nav-link text-white " 
        >
          MIS CLASES
        </button>
=======
          <a href="#" className="nav-link text-white rounded bg-secondary">
            Inicio
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Menú
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Carrito
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Mis Pedidos 
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Opciones
          </a>
>>>>>>> origin/samuel
        </li>
      </ul>
    </aside>
  );
}

export default SidebarCliente;