import planentreno1 from "../assets/entreno1.jpeg";
import planentreno2 from "../assets/entreno2.jpg";
import planentreno3 from "../assets/entreno3.jpeg";

function Planes(){
  return(
<section className="py-5 bg-light">
  <div className="container">
    <div className="bg-danger text-white py-2 rounded-3 text-center mb-3">
      <h2 className="fw-bold m-o text-bg-danger">Nuestros planes </h2>
    <p className=" mb-0 text-white">cada plan tiene sus ventajas </p>
    </div>

    <div className="row g-4">
      <div className="col-md-4">
        <div className="card h-100 shadow border-0 rounded-4">
          <img src={planentreno1} alt="plan de entrenamiento"
          style={{height:"250px", objectFit:"cover"}} />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">Plan de Entrenamiento 1</h5>
            <p className="card-text text-muted">
              Entrenamiento intensivo, dieta equilibrada

            </p>
            <p className="fw-bold text-danger fs-5">$15000</p>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow border-0 rounded-4">
          <img src={planentreno2} alt="Plan de entrenamiento "
          style={{height:"250px", objectFit:"cover"}} />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">Plan de Entrenamiento 2</h5>
            <p className="card-text text-muted">
              Entrenamiento moderado y asesoría nutricional
            </p>
            <p className="fw-bold text-danger fs-5">$14000</p>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow border-0 rounded-4">
          <img src={planentreno3} alt="Plan de entrenamiento 3"
          style={{height:"250px", objectFit:"cover"}} />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">Plan de Entrenamiento 3</h5>
            <p className="card-text text-muted">
              Entrenamiento ligero y asesoría básica para principiantes
            </p>
            <p className="fw-bold text-danger fs-5">$18000</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
  )
}

export default Planes;