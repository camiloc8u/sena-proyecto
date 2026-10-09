function TablaPedidos() {
  return (
    <section>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-danger mb-0">
              Pedidos recientes
            </h5>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th># Pedido</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#001</td>
                  <td>Juan Pérez</td>
                  <td>$45.000</td>
                  <td>
                    <span className="badge bg-success">Entregado</span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm me-2">
                      Ver
                    </button>
                    <button className="btn btn-warning btn-sm">
                      Cambiar estado
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#002</td>
                  <td>Ana Gómez</td>
                  <td>$32.000</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      En proceso
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm me-2">
                      Ver
                    </button>
                    <button className="btn btn-warning btn-sm">
                      Cambiar estado
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#003</td>
                  <td>Carlos Ruiz</td>
                  <td>$60.000</td>
                  <td>
                    <span className="badge bg-danger">Cancelado</span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm me-2">
                      Ver
                    </button>
                    <button className="btn btn-warning btn-sm">
                      Cambiar estado
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#004</td>
                  <td>Laura Díaz</td>
                  <td>$28.000</td>
                  <td>
                    <span className="badge bg-primary">Nuevo</span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm me-2">
                      Ver
                    </button>
                    <button className="btn btn-warning btn-sm">
                      Cambiar estado
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TablaPedidos;