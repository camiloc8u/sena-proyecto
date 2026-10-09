import Swal from "sweetalert2";

function CambiarPlan({ agregarReserva }) {

  const planes = [
        {
          id: 1,
          nombre: "Basico",
          precio: "$60.000/mes",
          beneficios: [
          "Acceso al gimnasio",
          "Zona de pesas y cardio",
          "Duchas y vestuarios"
          ]
        },
        {
          id: 2,
          nombre: "Premium",
          precio: "$80.000/mes",
          beneficios: [ 
          "Todo lo del plan Basico",
          "clases grupales ilimitadas",
          "1 sesion personal/mes",
          "Descuentos en nutricion"
          ]
        },
    {
      id: 3,
          nombre: "Elite",
          precio: "$100.000/mes",
          beneficios: [ 
          "Todo lo del plan Premium",
          "4 sesiones personales/mes",
          "plan nutricional completo",
          "Acceso 24/7",
          "invitado gratis 1 vez/mes"
          ]
    }
  ];

  const reservar = async (plan) => {
    const { isConfirmed } = await Swal.fire({
      background: "#151922",
      border: "#7CFC00",
      title: `cambiar a ${plan.nombre}?`,
      showCancelButton: true,
      confirmButtonColor: "#7CFC00",
      cancelButtonColor: "#b40000"
    });

    if (isConfirmed) {
      agregarReserva(plan); // 🔥 manda al padre
    }
  };

  return (
    <main className="p-4 row g-4">
    <div className="card bg-dark row g-4">
      <h2 className="text-white">CAMBIAR PLAN</h2>

      {planes.map((p, i) => (
        <div key={i} className="col-md-8 card text-white p-3 "
        style={{
          backgroundColor: "black",
          borderColor: "gray"
        }}
        >
          <h5>{p.nombre}</h5>
          <p>{p.precio} </p>
          <p>{p.beneficios}</p>

          <button className="text-white"
           onClick={() => reservar(p)}
            style={{
              backgroundColor: "transparent",
              borderColor: "#7CFC00"
            }}>
            CAMBIAR
          </button>
        </div>
      ))}
    </div>
    </main>
  );
}

export default CambiarPlan;