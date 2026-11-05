import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CalendarioRutinas = ({ alumnos = [], rutinas = [], onAsignacionGuardada }) => {
  const alumnosMock = alumnos.length > 0 ? alumnos : [
    { id: 1, name: 'Saray Castiblanco', plan: 'PREMIUM' },
    { id: 2, name: 'Carlos Martínez', plan: 'PREMIUM' },
  ];

  const rutinasMock = rutinas.length > 0 ? rutinas : [
    { id: 1, title: 'Fuerza Full Body', level: 'Intermedio' },
    { id: 2, title: 'HIIT Quema Grasa', level: 'Avanzado' },
  ];

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [asignaciones, setAsignaciones] = useState([
    { id: 1, alumnoId: 1, alumnoName: 'Saray Castiblanco', rutinaTitle: 'Fuerza Full Body', fecha: '2026-11-10' }
  ]);

  const handleAsignar = (e) => {
    e.preventDefault();
    if (!alumnoSeleccionado || !rutinaSeleccionada || !fechaSeleccionada) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor selecciona un alumno, una rutina y una fecha.',
        icon: 'warning',
        background: '#1A1A1A',
        color: '#ffffff',
        confirmButtonColor: '#CCFF00',
        customClass: { confirmButton: 'text-black font-bold' }
      });
      return;
    }

    const alumnoObj = alumnosMock.find(a => a.id.toString() === alumnoSeleccionado.toString());
    const rutinaObj = rutinasMock.find(r => r.id.toString() === rutinaSeleccionada.toString());

    const nuevaAsignacion = {
      id: Date.now(),
      alumnoId: alumnoObj.id,
      alumnoName: alumnoObj.name,
      rutinaTitle: rutinaObj.title,
      fecha: fechaSeleccionada
    };

    setAsignaciones([...asignaciones, nuevaAsignacion]);
    
    if (onAsignacionGuardada) {
      onAsignacionGuardada(nuevaAsignacion);
    }

    Swal.fire({
      title: '¡Rutina Asignada!',
      text: `Se programó "${rutinaObj.title}" para ${alumnoObj.name} el día ${fechaSeleccionada}.`,
      icon: 'success',
      background: '#1A1A1A',
      color: '#ffffff',
      confirmButtonColor: '#CCFF00',
      customClass: { confirmButton: 'text-black font-bold' }
    });

    // Limpiar formulario
    setAlumnoSeleccionado('');
    setRutinaSeleccionada('');
    setFechaSeleccionada('');
  };

  const handleEliminarAsignacion = (id) => {
    Swal.fire({
      title: '¿Remover asignación?',
      text: 'Esta rutina dejará de estar programada para este día.',
      icon: 'warning',
      background: '#1A1A1A',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Sí, remover'
    }).then((result) => {
      if (result.isConfirmed) {
        setAsignaciones(asignaciones.filter(a => a.id !== id));
        Swal.fire({
          title: 'Removida',
          icon: 'success',
          background: '#1A1A1A',
          color: '#ffffff',
          confirmButtonColor: '#CCFF00'
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <div>
          <h2 className="text-2xl font-bold text-[#CCFF00] uppercase tracking-wide">
            CALENDARIO DE RUTINAS
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Asigna y programa los entrenamientos de tus alumnos por fecha
          </p>
        </div>

        {/* Formulario de Asignación */}
        <div className="bg-[#1A1A1A] border border-zinc-800 p-6 rounded-md">
          <h3 className="text-lg font-semibold mb-4 text-white">Nueva Asignación</h3>
          <form onSubmit={handleAsignar} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Alumno</label>
              <select
                value={alumnoSeleccionado}
                onChange={(e) => setAlumnoSeleccionado(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-zinc-700 rounded p-2 text-white text-sm focus:border-[#CCFF00] focus:outline-none"
              >
                <option value="">Selecciona alumno...</option>
                {alumnosMock.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Rutina</label>
              <select
                value={rutinaSeleccionada}
                onChange={(e) => setRutinaSeleccionada(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-zinc-700 rounded p-2 text-white text-sm focus:border-[#CCFF00] focus:outline-none"
              >
                <option value="">Selecciona rutina...</option>
                {rutinasMock.map((r) => (
                  <option key={r.id} value={r.id}>{r.title} ({r.level})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Fecha</label>
              <input
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-zinc-700 rounded p-2 text-white text-sm focus:border-[#CCFF00] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#CCFF00] text-black font-bold py-2 px-4 rounded text-sm hover:bg-white transition-colors h-[38px]"
            >
              AGENDAR RUTINA
            </button>
          </form>
        </div>

        {/* Lista / Vista de Asignaciones Programadas */}
        <div className="bg-[#1A1A1A] border border-zinc-800 p-6 rounded-md">
          <h3 className="text-lg font-semibold mb-4 text-white">Rutinas Programadas en Agenda</h3>
          
          <div className="space-y-3">
            {asignaciones.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0A0A0A] border border-zinc-800 p-4 rounded hover:border-zinc-700 transition-colors gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-900 border border-[#CCFF00] text-[#CCFF00] px-3 py-2 rounded text-center font-bold text-xs">
                    {item.fecha}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.rutinaTitle}</h4>
                    <p className="text-xs text-zinc-400">Alumno: <span className="text-zinc-200">{item.alumnoName}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => handleEliminarAsignacion(item.id)}
                  className="border border-red-500 text-red-500 px-3 py-1.5 rounded text-xs hover:bg-red-500 hover:text-white transition-colors"
                >
                  Remover
                </button>
              </div>
            ))}

            {asignaciones.length === 0 && (
              <p className="text-zinc-500 text-center py-6 text-sm">
                No hay rutinas asignadas en el calendario todavía.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarioRutinas;