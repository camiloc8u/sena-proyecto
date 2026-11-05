import Swal from "sweetalert2";

function ReservarClase({ agregarReserva }) {

  const clases = [
        {
          id: 1,
          nombre: "Spinning",
          horario: "Mañana • 7:00 AM",
          instructor: "Ana López",
        },
        {
          id: 2,
          nombre: "CrossFit",
          horario: "Mañana • 6:00 PM",
          instructor: "Juan Pérez",
        },
    {
      id: 3,
      nombre: "HIIT",
      horario: "6:00 PM",
      instructor: "Carlos Ramírez",
    },
    {
      id: 4,
      nombre: "Zumba",
      horario: "7:00 PM",
      instructor: "Laura Torres",
    },
    {
      id: 5,
      nombre: "Pilates",
      horario: "7:00 PM",
      instructor: "Patricia Díaz",
    },
  ];

  const reservar = async (clase) => {
    const { isConfirmed } = await Swal.fire({
      background: "#151922",
      border: "#7CFC00",
      title: `¿Reservar ${clase.nombre}?`,
      showCancelButton: true,
      confirmButtonColor: "#7CFC00",
      cancelButtonColor: "#b40000"
    });

    if (isConfirmed) {
      agregarReserva(clase); // 🔥 manda al padre
    }
  };

  return (
    <main className="p-4 row g-4">
    <div className="card bg-dark row g-4">
      <h2 className="text-white">CLASES DISPONIBLES</h2>

      {clases.map((c, i) => (
        <div key={i} className="col-md-8 card text-white p-3 "
        style={{
          backgroundColor: "black",
          borderColor: "gray"
        }}
        >
          <h5>{c.nombre}</h5>
          <p>{c.horario} • {c.instructor}</p>

          <button className="text-white"
           onClick={() => reservar(c)}
            style={{
              backgroundColor: "transparent",
              borderColor: "#7CFC00"
            }}>
            RESERVAR
          </button>
        </div>
      ))}
    </div>
    </main>
  );
}

export default ReservarClase;