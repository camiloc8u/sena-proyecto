function SidebarAdmin() {
  return (
    <aside
      className="bg-dark text-white p-4"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold text-danger mb-4">ZONA FIT</h4>

      <p className="text-uppercase small text-secondary mb-2">Administrador</p>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white rounded bg-secondary">
            Panel principal
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            PLANES DE ENTRENAMIENTO
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Pedidos
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Clientes
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            Reportes
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarAdmin;