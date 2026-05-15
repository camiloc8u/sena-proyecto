import { useEffect, useState } from "react";
import Swal from "sweetalert2";






function TablaProductos({ modo = "admin" }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    fetch("https://69c2c5ee7518bf8facbf7602.mockapi.io/Productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.log(error));
  }, []);

  const agregarAlCarrito = async (producto) => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const nuevoItem = {
        usuarioId: usuario.id,
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      };

      await fetch("http://localhost:3001/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoItem),
      });

      Swal.fire({
        icon: "success",
        title: "Agregado al carrito",
        confirmButtonColor: "#dc3545",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerImagen = (nombre) => {
    const n = nombre ? nombre.toLowerCase() : "";
    if (n.includes("bbq")) return "/logo.png";
  return "/logo.png"; 
};

  const eliminarProducto = async (id) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      fetch(`https://69c2c5ee7518bf8facbf7602.mockapi.io/Productos/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setProductos(productos.filter((prod) => prod.id !== id));
          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "El producto fue eliminado correctamente",
            confirmButtonColor: "#dc3545",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const agregarProducto = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Agregar producto",
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
        '<input id="categoria" class="swal2-input" placeholder="Categoría">' +
        '<input id="precio" class="swal2-input" placeholder="Precio">' +
        '<input id="estado" class="swal2-input" placeholder="Estado">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: document.getElementById("nombre").value,
          categoria: document.getElementById("categoria").value,
          precio: document.getElementById("precio").value,
          estado: document.getElementById("estado").value,
        };
      },
    });

    if (formValues) {
      fetch("https://69c2c5ee7518bf8facbf7602.mockapi.io/Productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((nuevo) => {
          setProductos([...productos, nuevo]);
          Swal.fire({
            icon: "success",
            title: "Producto agregado",
            confirmButtonColor: "#dc3545",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const editarProducto = async (prod) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar producto",
      html:
        `<input id="nombre" class="swal2-input" value="${prod.nombre}">` +
        `<input id="categoria" class="swal2-input" value="${prod.categoria}">` +
        `<input id="precio" class="swal2-input" value="${prod.precio}">` +
        `<input id="estado" class="swal2-input" value="${prod.estado}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: document.getElementById("nombre").value,
          categoria: document.getElementById("categoria").value,
          precio: document.getElementById("precio").value,
          estado: document.getElementById("estado").value,
        };
      },
    });

    if (formValues) {
      fetch(`https://69c2c5ee7518bf8facbf7602.mockapi.io/Productos/${prod.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((actualizado) => {
          setProductos(productos.map((p) => (p.id === prod.id ? actualizado : p)));
          Swal.fire({
            icon: "success",
            title: "Producto actualizado",
            confirmButtonColor: "#dc3545",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const productosFiltrados = productos.filter(
    (prod) =>
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtroEstado === "" || prod.estado === filtroEstado)
  );

  return (
    <section className="mb-4">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-danger mb-0">
              {modo === "admin" ? "Productos recientes" : "Nuestro menú"}
            </h5>

            {modo === "admin" && (
              <button className="btn btn-danger btn-sm" onClick={agregarProducto}>
                Agregar producto
              </button>
            )}
          </div>

          {/* FILTROS */}
          <div className="row mb-3 g-2">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
                <option value="Pocas unidades">Pocas unidades</option>
              </select>
            </div>
          </div>

          {/* GRID */}
          <div className="row g-4">
            {productosFiltrados.map((prod) => (
              <div className="col-md-4" key={prod.id}>
                <div className="card h-100 border rounded-4 producto-card overflow-hidden">
                  <img
                    src={obtenerImagen(prod.nombre)}
                    alt={prod.nombre}
                    className="img-fluid"
                    style={{
                      height: "190px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-1">{prod.nombre}</h5>
                      <small className="text-muted">{prod.categoria}</small>
                      <h4 className="mt-3 fw-bold text-danger">${prod.precio}</h4>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span
                        className={`badge px-3 py-2 ${
                          prod.estado.toLowerCase() === "disponible"
                            ? "bg-success"
                            : prod.estado.toLowerCase() === "agotado"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {prod.estado}
                      </span>

                      {modo === "admin" && (
                        <div>
                          <button
                            className="btn btn-outline-warning btn-sm me-2"
                            onClick={() => editarProducto(prod)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminarProducto(prod.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      )}

                      {modo === "cliente" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => agregarAlCarrito(prod)}
                        >
                          Agregar al carrito
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TablaProductos;