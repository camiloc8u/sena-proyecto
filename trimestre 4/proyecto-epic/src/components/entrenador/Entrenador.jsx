import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Entrenador = ({ setVista }) => {
  const [activeView, setActiveView] = useState('RESUMEN');
  const [searchTerm, setSearchTerm] = useState('');

  const [clases, setClases] = useState([]);
  const [cargandoClases, setCargandoClases] = useState(false);
  const API_CLASES = 'https://69dc3d4084f912a264037cde.mockapi.io/clases';

  const [alumnos, setAlumnos] = useState([
    { id: 1, name: 'Saray Castiblanco', plan: 'PREMIUM', target: 'Tonificación', progress: 88 },
    { id: 2, name: 'Carlos Martínez', plan: 'PREMIUM', target: 'Pérdida de peso', progress: 85 },
    { id: 3, name: 'Ana López', plan: 'ELITE', target: 'Ganancia muscular', progress: 92 },
  ]);

  const [rutinas, setRutinas] = useState([
    { id: 1, title: 'Fuerza Full Body', level: 'Intermedio', time: '60 min', exercises: ['Sentadillas', 'Press de Banca', 'Peso Muerto', 'Dominadas'] },
    { id: 2, title: 'HIIT Quema Grasa', level: 'Avanzado', time: '30 min', exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees'] },
  ]);

  const stats = [
    { label: 'Clases Esta Semana', value: '25' },
    { label: 'Alumnos Activos', value: alumnos.length.toString() },
    { label: 'Horas Entrenadas', value: '31h' },
  ];
  
  const schedule = [
    { day: 'Lunes', count: 5, hours: '6h' },
    { day: 'Martes', count: 4, hours: '5h' },
    { day: 'Miércoles', count: 5, hours: '6h' },
    { day: 'Jueves', count: 4, hours: '5h' },
    { day: 'Viernes', count: 5, hours: '6h' },
    { day: 'Sábado', count: 2, hours: '3h' }
  ];

  useEffect(() => {
    if (activeView === 'MIS CLASES') {
      cargarClases();
    }
  }, [activeView]);

  const cargarClases = () => {
    setCargandoClases(true);
    fetch(API_CLASES)
      .then((res) => res.json())
      .then((data) => {
        setClases(data);
        setCargandoClases(false);
      })
      .catch((error) => {
        console.error("Error al cargar las clases:", error);
        setCargandoClases(false);
      });
  };


  const handleCrearClase = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Crear Nueva Clase',
      background: '#1A1A1A', color: '#ffffff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; padding: 0 10px;">
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Nombre de la clase</label>
          <input id="swal-nombre" class="swal2-input" placeholder="Ej. Yoga" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Hora</label>
          <input id="swal-hora" type="time" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Día</label>
          <input id="swal-dia" class="swal2-input" placeholder="Ej. Lunes" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;"><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Duración</label>
            <input id="swal-duracion" class="swal2-input" placeholder="Ej. 60 min" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
            <div style="flex: 1;"><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Cupos</label>
            <input id="swal-cupos" type="number" class="swal2-input" placeholder="Ej. 15" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          </div>
        </div>
      `,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
      confirmButtonColor: '#CCFF00', cancelButtonColor: '#3f3f46', customClass: { confirmButton: 'text-black font-bold' },
      preConfirm: () => ({
        nombre: document.getElementById('swal-nombre').value,
        hora: document.getElementById('swal-hora').value,
        dia: document.getElementById('swal-dia').value,
        duracion: document.getElementById('swal-duracion').value,
        cupos: document.getElementById('swal-cupos').value
      })
    });

    if (formValues) {
      fetch(API_CLASES, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formValues) })
      .then(res => res.json())
      .then(nuevaClase => {
        setClases([...clases, nuevaClase]);
        Swal.fire({ title: '¡Creada!', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
      }).catch(err => console.error(err));
    }
  };

  const handleEditarClase = async (clase) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Clase', background: '#1A1A1A', color: '#ffffff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; padding: 0 10px;">
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Nombre de la clase</label>
          <input id="swal-nombre" class="swal2-input" value="${clase.nombre || ''}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Hora</label>
          <input id="swal-hora" type="time" class="swal2-input" value="${clase.hora || ''}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Día</label>
          <input id="swal-dia" class="swal2-input" value="${clase.dia || ''}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;"><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Duración</label>
            <input id="swal-duracion" class="swal2-input" value="${clase.duracion || ''}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
            <div style="flex: 1;"><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Cupos</label>
            <input id="swal-cupos" type="number" class="swal2-input" value="${clase.cupos || ''}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          </div>
        </div>
      `,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Actualizar', cancelButtonText: 'Cancelar',
      confirmButtonColor: '#CCFF00', cancelButtonColor: '#3f3f46', customClass: { confirmButton: 'text-black font-bold' },
      preConfirm: () => ({
        nombre: document.getElementById('swal-nombre').value, hora: document.getElementById('swal-hora').value,
        dia: document.getElementById('swal-dia').value, duracion: document.getElementById('swal-duracion').value,
        cupos: document.getElementById('swal-cupos').value
      })
    });

    if (formValues) {
      fetch(`${API_CLASES}/${clase.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formValues) })
      .then(res => res.json())
      .then(claseActualizada => {
        setClases(clases.map(c => c.id === clase.id ? claseActualizada : c));
        Swal.fire({ title: '¡Actualizada!', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
      }).catch(err => console.error(err));
    }
  };

  const handleEliminarClase = (id) => {
    Swal.fire({
      title: '¿Eliminar clase?', icon: 'warning', background: '#1A1A1A', color: '#ffffff',
      showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#3f3f46', confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_CLASES}/${id}`, { method: 'DELETE' })
          .then(() => {
            setClases(clases.filter(c => c.id !== id));
            Swal.fire({ title: 'Eliminada', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
          });
      }
    });
  };


  const handleCrearAlumno = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Alumno', background: '#1A1A1A', color: '#ffffff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; padding: 0 10px;">
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Nombre Completo</label>
          <input id="swal-al-name" class="swal2-input" placeholder="Ej. Juan Pérez" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Plan</label>
          <input id="swal-al-plan" class="swal2-input" placeholder="Ej. PREMIUM" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Objetivo</label>
          <input id="swal-al-target" class="swal2-input" placeholder="Ej. Pérdida de peso" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Progreso Inicial (%)</label>
          <input id="swal-al-progress" type="number" min="0" max="100" class="swal2-input" placeholder="0" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
        </div>
      `,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Guardar', confirmButtonColor: '#CCFF00', cancelButtonColor: '#3f3f46', customClass: { confirmButton: 'text-black font-bold' },
      preConfirm: () => ({
        id: Date.now(), // ID temporal
        name: document.getElementById('swal-al-name').value,
        plan: document.getElementById('swal-al-plan').value,
        target: document.getElementById('swal-al-target').value,
        progress: Number(document.getElementById('swal-al-progress').value) || 0
      })
    });

    if (formValues) {
      setAlumnos([...alumnos, formValues]);
      Swal.fire({ title: 'Agregado', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
    }
  };

  const handleEditarAlumno = async (alumno) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Alumno', background: '#1A1A1A', color: '#ffffff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; padding: 0 10px;">
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Nombre Completo</label>
          <input id="swal-al-name" class="swal2-input" value="${alumno.name}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Plan</label>
          <input id="swal-al-plan" class="swal2-input" value="${alumno.plan}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Objetivo</label>
          <input id="swal-al-target" class="swal2-input" value="${alumno.target}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Progreso (%)</label>
          <input id="swal-al-progress" type="number" min="0" max="100" class="swal2-input" value="${alumno.progress}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
        </div>
      `,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Actualizar', confirmButtonColor: '#CCFF00', cancelButtonColor: '#3f3f46', customClass: { confirmButton: 'text-black font-bold' },
      preConfirm: () => ({
        ...alumno,
        name: document.getElementById('swal-al-name').value,
        plan: document.getElementById('swal-al-plan').value,
        target: document.getElementById('swal-al-target').value,
        progress: Number(document.getElementById('swal-al-progress').value)
      })
    });

    if (formValues) {
      setAlumnos(alumnos.map(a => a.id === alumno.id ? formValues : a));
      Swal.fire({ title: 'Actualizado', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
    }
  };

  const handleEliminarAlumno = (id) => {
    Swal.fire({
      title: '¿Eliminar alumno?', icon: 'warning', background: '#1A1A1A', color: '#ffffff',
      showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#3f3f46', confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        setAlumnos(alumnos.filter(a => a.id !== id));
        Swal.fire({ title: 'Eliminado', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
      }
    });
  };


  const handleCrearRutina = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Crear Rutina', background: '#1A1A1A', color: '#ffffff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; padding: 0 10px;">
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Título</label>
          <input id="swal-rut-title" class="swal2-input" placeholder="Ej. Pierna Intenso" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Nivel</label>
          <select id="swal-rut-level" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;">
            <option value="Principiante">Principiante</option><option value="Intermedio">Intermedio</option><option value="Avanzado">Avanzado</option>
          </select></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Tiempo</label>
          <input id="swal-rut-time" class="swal2-input" placeholder="Ej. 45 min" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Ejercicios (separados por coma)</label>
          <textarea id="swal-rut-ex" class="swal2-textarea" placeholder="Sentadilla, Prensa, Curl..." style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></textarea></div>
        </div>
      `,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Guardar', confirmButtonColor: '#CCFF00', cancelButtonColor: '#3f3f46', customClass: { confirmButton: 'text-black font-bold' },
      preConfirm: () => ({
        id: Date.now(),
        title: document.getElementById('swal-rut-title').value,
        level: document.getElementById('swal-rut-level').value,
        time: document.getElementById('swal-rut-time').value,
        exercises: document.getElementById('swal-rut-ex').value.split(',').map(e => e.trim()).filter(e => e)
      })
    });

    if (formValues) {
      setRutinas([...rutinas, formValues]);
      Swal.fire({ title: 'Rutina Creada', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
    }
  };

  const handleEditarRutina = async (rutina) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Rutina', background: '#1A1A1A', color: '#ffffff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; padding: 0 10px;">
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Título</label>
          <input id="swal-rut-title" class="swal2-input" value="${rutina.title}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Nivel</label>
          <select id="swal-rut-level" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;">
            <option value="Principiante" ${rutina.level === 'Principiante' ? 'selected' : ''}>Principiante</option>
            <option value="Intermedio" ${rutina.level === 'Intermedio' ? 'selected' : ''}>Intermedio</option>
            <option value="Avanzado" ${rutina.level === 'Avanzado' ? 'selected' : ''}>Avanzado</option>
          </select></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Tiempo</label>
          <input id="swal-rut-time" class="swal2-input" value="${rutina.time}" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;"></div>
          <div><label style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px; display: block;">Ejercicios (separados por coma)</label>
          <textarea id="swal-rut-ex" class="swal2-textarea" style="margin:0; width:100%; box-sizing:border-box; background:#0A0A0A; color:white; border:1px solid #3f3f46; border-radius:6px;">${rutina.exercises.join(', ')}</textarea></div>
        </div>
      `,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Actualizar', confirmButtonColor: '#CCFF00', cancelButtonColor: '#3f3f46', customClass: { confirmButton: 'text-black font-bold' },
      preConfirm: () => ({
        ...rutina,
        title: document.getElementById('swal-rut-title').value,
        level: document.getElementById('swal-rut-level').value,
        time: document.getElementById('swal-rut-time').value,
        exercises: document.getElementById('swal-rut-ex').value.split(',').map(e => e.trim()).filter(e => e)
      })
    });

    if (formValues) {
      setRutinas(rutinas.map(r => r.id === rutina.id ? formValues : r));
      Swal.fire({ title: 'Actualizada', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
    }
  };

  const handleEliminarRutina = (id) => {
    Swal.fire({
      title: '¿Eliminar rutina?', icon: 'warning', background: '#1A1A1A', color: '#ffffff',
      showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#3f3f46', confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        setRutinas(rutinas.filter(r => r.id !== id));
        Swal.fire({ title: 'Eliminada', icon: 'success', background: '#1A1A1A', color: 'white', confirmButtonColor: '#CCFF00' });
      }
    });
  };


  const getLevelColor = (level) => {
    switch(level) {
      case 'Principiante': return 'text-green-400';
      case 'Intermedio': return 'text-[#CCFF00]';
      case 'Avanzado': return 'text-green-500';
      default: return 'text-zinc-400';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setVista("home");
  };

  const filteredStudents = alumnos.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderResumen = () => (
    <div className="animate-fadeIn mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1A1A1A] p-6 rounded-md">
            <p className="text-zinc-400 text-sm mb-4">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4 text-white">ACTIVIDAD SEMANAL</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {schedule.map((item, index) => (
          <div key={index} className="bg-[#1A1A1A] p-6 rounded-md flex flex-col items-center border border-transparent hover:border-zinc-700 transition-colors">
            <span className="text-zinc-300 mb-2">{item.day}</span>
            <span className="text-3xl font-bold text-[#CCFF00] mb-1">{item.count}</span>
            <span className="text-xs text-zinc-500 mb-2">clases</span>
            <span className="text-sm text-zinc-400">{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClases = () => (
    <div className="animate-fadeIn mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">MIS CLASES PROGRAMADAS</h2>
          <span className="text-zinc-400 text-sm">Gestiona el horario de tus clases</span>
        </div>
        <button onClick={handleCrearClase} className="bg-[#CCFF00] text-black font-bold px-4 py-2 rounded text-sm hover:bg-white transition-colors">
          + NUEVA CLASE
        </button>
      </div>

      {cargandoClases ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-[#CCFF00] text-lg animate-pulse">Cargando clases desde el servidor...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clases.map((clase) => (
            <div key={clase.id} className="bg-[#1A1A1A] border border-zinc-800 p-6 rounded-md hover:border-[#CCFF00] transition-colors duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                    {clase.nombre || clase.titulo || `Clase #${clase.id}`}
                  </h3>
                  <span className="bg-zinc-800 text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full">
                    {clase.hora || clase.horario || '00:00'}
                  </span>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <span className="text-zinc-500 w-24">Día:</span>
                    <span className="text-zinc-300">{clase.dia || clase.fecha || 'No especificado'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-zinc-500 w-24">Duración:</span>
                    <span className="text-zinc-300">{clase.duracion || '60 min'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-zinc-500 w-24">Capacidad:</span>
                    <span className="text-zinc-300">{clase.cupos || clase.capacidad || '0'} personas</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEditarClase(clase)} className="flex-1 border border-[#CCFF00] text-[#CCFF00] font-bold py-2 rounded text-sm hover:bg-[#CCFF00] hover:text-black transition-colors">
                  EDITAR
                </button>
                <button onClick={() => handleEliminarClase(clase.id)} className="flex-1 border border-red-500 text-red-500 font-medium py-2 rounded text-sm hover:bg-red-500 hover:text-white transition-colors">
                  ELIMINAR
                </button>
              </div>
            </div>
          ))}
          {clases.length === 0 && !cargandoClases && (
            <div className="col-span-full text-center py-10 text-zinc-500 bg-[#1A1A1A] rounded-md border border-zinc-800">
              No hay clases disponibles. Haz clic en "NUEVA CLASE" para agregar una.
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderAlumnos = () => (
    <div className="animate-fadeIn mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">MIS ALUMNOS PERSONALES</h2>
          <span className="text-zinc-400 text-sm">{filteredStudents.length} alumnos registrados</span>
        </div>
        <button onClick={handleCrearAlumno} className="bg-[#CCFF00] text-black font-bold px-4 py-2 rounded text-sm hover:bg-white transition-colors">
          + AGREGAR ALUMNO
        </button>
      </div>

      <div className="mb-6">
         <input 
            type="text" 
            placeholder="Buscar alumno..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-2 bg-[#1A1A1A] border border-zinc-800 text-white rounded focus:border-[#CCFF00] focus:outline-none"
         />
      </div>

      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-[#1A1A1A] border border-zinc-800 p-5 rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-zinc-600 transition-colors">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-14 h-14 border border-[#CCFF00] rounded-md flex items-center justify-center text-[#CCFF00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">{student.name}</h3>
                <p className="text-sm text-zinc-400">Plan: {student.plan}</p>
              </div>
            </div>
            
            <div className="flex flex-col w-full md:w-1/4">
               <span className="text-xs text-zinc-500 mb-1">Objetivo</span>
               <span className="text-white font-medium">{student.target}</span>
            </div>

            <div className="w-full md:w-1/4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Progreso</span>
                <span className="text-[#CCFF00]">{student.progress}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-[#CCFF00] h-2 rounded-full transition-all duration-500" style={{ width: `${student.progress}%` }}></div>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
               <button onClick={() => handleEditarAlumno(student)} className="flex-1 md:flex-none border border-[#CCFF00] text-[#CCFF00] px-4 py-2 rounded text-sm hover:bg-[#CCFF00] hover:text-black transition-colors whitespace-nowrap">
                 EDITAR
               </button>
               <button onClick={() => handleEliminarAlumno(student.id)} className="flex-1 md:flex-none border border-red-500 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-500 hover:text-white transition-colors whitespace-nowrap">
                 X
               </button>
            </div>
          </div>
        ))}
        {filteredStudents.length === 0 && (
           <p className="text-zinc-500 text-center py-6">No se encontraron alumnos.</p>
        )}
      </div>
    </div>
  );

  const renderRutinas = () => (
    <div className="animate-fadeIn mt-8">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-semibold text-white">MIS RUTINAS</h2>
         <button onClick={handleCrearRutina} className="bg-[#CCFF00] text-black font-bold px-4 py-2 rounded text-sm hover:bg-white transition-colors">
            + NUEVA RUTINA
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rutinas.map((routine) => (
          <div key={routine.id} className="bg-[#1A1A1A] border border-zinc-800 p-6 rounded-md hover:border-zinc-600 transition-colors">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                  <div className="text-[#CCFF00]">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{routine.title}</h3>
                    <p className="text-sm text-zinc-400">
                       {routine.time} • <span className={getLevelColor(routine.level)}>{routine.level}</span>
                    </p>
                  </div>
               </div>
               <button onClick={() => handleEliminarRutina(routine.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
               </button>
            </div>
            
            <div className="mb-8">
              <p className="text-xs text-zinc-500 mb-3">EJERCICIOS PRINCIPALES:</p>
              <ul className="space-y-2">
                {routine.exercises.map((ex, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#CCFF00] rotate-45"></div>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 border border-[#CCFF00] text-[#CCFF00] font-medium py-2 rounded hover:bg-[#CCFF00] hover:text-black transition-colors">
                ASIGNAR
              </button>
              <button onClick={() => handleEditarRutina(routine)} className="border border-zinc-600 text-zinc-300 px-6 py-2 rounded hover:border-white hover:text-white transition-colors">
                EDITAR
              </button>
            </div>
          </div>
        ))}
        {rutinas.length === 0 && (
           <p className="col-span-full text-zinc-500 text-center py-6">No hay rutinas creadas.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#CCFF00] uppercase tracking-wide">
            PANEL DE ENTRENADOR
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Gestión del gimnasio GYMZONE
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-800 pb-4">
          {['RESUMEN', 'MIS CLASES', 'MIS ALUMNOS', 'RUTINAS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-6 py-2.5 rounded-md font-bold text-sm transition-all ${
                activeView === tab
                  ? 'bg-[#CCFF00] text-black'
                  : 'bg-transparent text-white border border-zinc-800 hover:border-zinc-500'
              }`}
            >
              {tab}
            </button>
          ))}
          
          <button
            onClick={handleLogout}
            className="ml-auto px-5 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors text-sm font-medium"
          >
            Cerrar sesión
          </button>
        </div>

        <main>
          {activeView === 'RESUMEN' && renderResumen()}
          {activeView === 'MIS CLASES' && renderClases()}
          {activeView === 'MIS ALUMNOS' && renderAlumnos()}
          {activeView === 'RUTINAS' && renderRutinas()}
        </main>

      </div>
    </div>
  );
};

export default Entrenador;