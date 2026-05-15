function SidebarCliente() {
  return (
    <aside
      className="bg-dark text-white p-4 "
      style={{ width: "260px",minWidth:"260px", maxWidth:"260px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold text-danger mb-4">Pizza Nostra</h4>

      <p className="text-uppercase small text-secondary mb-2">Cliente</p>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
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
        </li>
      </ul>
    </aside>
  );
}

export default SidebarCliente;