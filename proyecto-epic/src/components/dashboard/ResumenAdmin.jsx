function ResumenAdmin() {
  return (
    <section className="mb-4">
      <div className="row g-4">
        
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Productos</p>
              <h3 className="fw-bold text-danger">18</h3>
              <p className="mb-0 small text-secondary">Pizzas registradas</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Pedidos</p>
              <h3 className="fw-bold text-danger">42</h3>
              <p className="mb-0 small text-secondary">Pedidos del día</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Clientes</p>
              <h3 className="fw-bold text-danger">27</h3>
              <p className="mb-0 small text-secondary">Clientes activos</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Ventas</p>
              <h3 className="fw-bold text-danger">$850.000</h3>
              <p className="mb-0 small text-secondary">Ingreso estimado</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ResumenAdmin;