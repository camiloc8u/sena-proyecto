import React, { useState, useEffect } from 'react';

const API_MIEMBROS = 'http://localhost:3001/api/usuarios'; 
const API_CLASES = 'https://69dc3d4084f912a264037cde.mockapi.io/clases'; 

export default function NavbarAdmin() {
  const [activeTab, setActiveTab] = useState('RESUMEN');
  const [miembros, setMiembros] = useState([]);
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(false);


  const [searchMiembro, setSearchMiembro] = useState('');
  const [searchClase, setSearchClase] = useState('');

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({});

  const tabs = ['RESUMEN', 'MIEMBROS', 'CLASES', 'FINANZAS'];

  const fetchMiembros = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_MIEMBROS);
      if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
      const data = await response.json();
      setMiembros(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchClases = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_CLASES);
      if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
      const data = await response.json();
      setClases(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMiembros();
    fetchClases();
  }, []);

  useEffect(() => {
    if (activeTab === 'MIEMBROS') fetchMiembros();
    else if (activeTab === 'CLASES') fetchClases();
  }, [activeTab]);

  const openModal = (type, data = null) => {
    setModalConfig({ isOpen: true, type, data });
    setFormData(data || {}); 
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: '', data: null });
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    const { type, data } = modalConfig;
    
    const isMiembro = type.includes('MIEMBRO');
    const url = isMiembro ? API_MIEMBROS : API_CLASES;
    const typeCreate = type.includes('CREATE');
    const method = typeCreate ? 'POST' : 'PUT';


    const finalUrl = method === 'PUT' ? `${url}/${isMiembro ? data.idusuario : data.id}` : url;

    try {
      const response = await fetch(finalUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error(`Error al guardar: ${response.status}`);
      
      closeModal();
      
      if (isMiembro) fetchMiembros();
      else fetchClases();
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id, isMiembro) => {
    if (!window.confirm(`¿Seguro que deseas eliminar este registro?`)) return;
    const url = isMiembro ? API_MIEMBROS : API_CLASES;
    
    try {
      await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (isMiembro) fetchMiembros();
      else fetchClases();
    } catch(error) {
      console.error(error);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };

  const filteredMiembros = miembros.filter(m => {
    const fullName = `${m.primer_nombre || ''} ${m.primer_apellido || ''}`.toLowerCase();
    const email = (m.correo || '').toLowerCase();
    const doc = (m.num_doc || '').toLowerCase();
    const term = searchMiembro.toLowerCase();
    return fullName.includes(term) || email.includes(term) || doc.includes(term);
  });

  const filteredClases = clases.filter(c => {
    const nombreClase = (c.nombre || c.titulo || '').toLowerCase();
    const instructorClase = (c.instructor || c.entrenador || '').toLowerCase();
    const term = searchClase.toLowerCase();
    return nombreClase.includes(term) || instructorClase.includes(term);
  });


  const miembrosActivos = miembros.filter(m => m.estado_cuenta === 'Activo' || !m.estado_cuenta).length;
  const precioMembresiaPromedio = 50000;
  const ingresosInscripciones = miembrosActivos * precioMembresiaPromedio;
  const gastosFijos = 150000; 
  const balanceNeto = ingresosInscripciones - gastosFijos;

  const theme = {
    bg: '#111111', surface: '#1a1a1a', text: '#ffffff',
    primary: '#99FF00', border: '#333333',
    inputBg: '#2a2a2a', cardBg: '#222222'
  };

  const inputStyle = {
    width: '100%', padding: '10px', margin: '10px 0',
    background: theme.inputBg, color: theme.text,
    border: `1px solid ${theme.border}`, borderRadius: '5px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      
      <h1 style={{ color: theme.primary, marginBottom: '5px' }}>ADMINISTRACIÓN</h1>
      <p style={{ color: '#888', marginTop: 0, marginBottom: '30px' }}>Gestión del gimnasio GYMZONE</p>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: activeTab === tab ? theme.primary : 'transparent', 
              color: activeTab === tab ? '#000' : theme.text,
              border: activeTab === tab ? 'none' : `1px solid ${theme.border}`,
              padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <button
        style={{ backgroundColor: "transparent", border: `2px solid ${theme.primary}`, color: theme.primary, marginBottom: "20px", padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
        onClick={cerrarSesion}
      >
        Cerrar sesión
      </button>

      <div style={{ background: theme.surface, padding: '20px', borderRadius: '8px', border: `1px solid ${theme.border}` }}>

        {activeTab === 'RESUMEN' && (
          <div>
            <h2>Resumen General</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, minWidth: '200px', border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>👥 Miembros Registrados</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>{miembros.length || 0}</h3>
              </div>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, minWidth: '200px', border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>🏋️ Clases Ofertadas</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', color: theme.primary }}>{clases.length || 0}</h3>
              </div>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, minWidth: '200px', border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>💰 Balance Mensual Est.</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', color: balanceNeto >= 0 ? '#99FF00' : '#ff4d4d' }}>
                  ${balanceNeto.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'MIEMBROS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2>Gestión de Miembros</h2>
              <button 
                onClick={() => openModal('CREATE_MIEMBRO')} 
                style={{ background: theme.primary, color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                + NUEVO MIEMBRO
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Buscar por nombre, correo o documento..."
                value={searchMiembro}
                onChange={(e) => setSearchMiembro(e.target.value)}
                style={{ width: '100%', maxWidth: '400px', padding: '10px', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '5px', outline: 'none' }}
              />
            </div>

            {loading ? <p style={{ color: theme.primary }}>Cargando datos...</p> : (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.border}`, color: '#888' }}>
                    <th style={{ padding: '10px 0' }}>NOMBRE COMPLETO</th>
                    <th>ROL</th>
                    <th>ESTADO</th>
                    <th>EMAIL</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMiembros.length > 0 ? (
                    filteredMiembros.map(m => (
                      <tr key={m.idusuario} style={{ borderBottom: `1px solid ${theme.border}` }}>
                        <td style={{ padding: '15px 0' }}>{m.primer_nombre} {m.primer_apellido}</td>
                        <td style={{ color: theme.primary }}>{m.rol}</td>
                        <td>
                          <span style={{ color: m.estado_cuenta === 'Activo' || !m.estado_cuenta ? '#99FF00' : '#ff4d4d' }}>
                            {m.estado_cuenta || 'Activo'}
                          </span>
                        </td>
                        <td>{m.correo || 'Sin email'}</td>
                        <td>
                          <button onClick={() => openModal('EDIT_MIEMBRO', m)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }} title="Editar">✏️</button>
                          <button onClick={() => handleEliminar(m.idusuario, true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }} title="Eliminar">🗑️</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No se encontraron miembros.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'CLASES' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2>Gestión de Clases</h2>
              <button 
                onClick={() => openModal('CREATE_CLASE')} 
                style={{ background: theme.primary, color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                + NUEVA CLASE
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Buscar por clase o instructor..."
                value={searchClase}
                onChange={(e) => setSearchClase(e.target.value)}
                style={{ width: '100%', maxWidth: '400px', padding: '10px', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '5px', outline: 'none' }}
              />
            </div>

            {loading ? <p style={{ color: theme.primary }}>Cargando clases...</p> : (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.border}`, color: '#888' }}>
                    <th style={{ padding: '10px 0' }}>CLASE</th>
                    <th>INSTRUCTOR / ENTRENADOR</th>
                    <th>HORARIO / DÍA</th>
                    <th>DURACIÓN / CUPOS</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClases.length > 0 ? (
                    filteredClases.map(c => (
                      <tr key={c.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                        <td style={{ padding: '15px 0', fontWeight: 'bold' }}>{c.nombre || c.titulo || `Clase #${c.id}`}</td>
                        <td style={{ color: '#aaa' }}>{c.instructor || c.entrenador || 'Por asignar'}</td>
                        <td>
                          <span style={{ color: theme.primary }}>{c.horario || `${c.dia || ''} ${c.hora || ''}` || 'Sin horario'}</span>
                        </td>
                        <td>{c.duracion || '60 min'} / {c.cupos || c.capacidad || '0'} personas</td>
                        <td>
                          <button onClick={() => openModal('EDIT_CLASE', c)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }} title="Editar">✏️</button>
                          <button onClick={() => handleEliminar(c.id, false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }} title="Eliminar">🗑️</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No se encontraron clases programadas.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
        {activeTab === 'FINANZAS' && (
          <div>
            <h2>Panel de Control Financiero</h2>
            <p style={{ color: '#888', marginTop: 0 }}>Métricas calculadas en tiempo real en base a los usuarios activos.</p>

            {/* Tarjetas de Métricas */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', marginBottom: '35px', flexWrap: 'wrap' }}>
              <div style={{ padding: '20px', background: '#1e293b', borderRadius: '6px', flex: 1, minWidth: '220px' }}>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>📈 Ingresos por Mensualidades</p>
                <h3 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#4ade80' }}>${ingresosInscripciones.toLocaleString()}</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Basado en {miembrosActivos} clientes activos</span>
              </div>
              <div style={{ padding: '20px', background: '#311b1b', borderRadius: '6px', flex: 1, minWidth: '220px' }}>
                <p style={{ margin: 0, color: '#f87171', fontSize: '14px' }}>📉 Gastos de Operación</p>
                <h3 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#f87171' }}>-${gastosFijos.toLocaleString()}</h3>
                <span style={{ fontSize: '12px', color: '#854d4d' }}>Servicios, mantenimiento y API</span>
              </div>
              <div style={{ padding: '20px', background: balanceNeto >= 0 ? '#1b3122' : '#3d1c1c', borderRadius: '6px', flex: 1, minWidth: '220px' }}>
                <p style={{ margin: 0, color: '#a3e635', fontSize: '14px' }}>📊 Utilidad Neta</p>
                <h3 style={{ fontSize: '28px', margin: '10px 0 0 0', color: theme.primary }}>${balanceNeto.toLocaleString()}</h3>
                <span style={{ fontSize: '12px', color: '#aaa' }}>Rendimiento mensual libre</span>
              </div>
            </div>

            <h3>Últimos Movimientos</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${theme.border}`, color: '#888' }}>
                  <th style={{ padding: '10px 0' }}>CONCEPTO / DESCRIPCIÓN</th>
                  <th>CATEGORÍA</th>
                  <th>FECHA</th>
                  <th style={{ textAlign: 'right' }}>MONTO</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '15px 0' }}>Pago masivo mensualidad de clientes activos</td>
                  <td style={{ color: '#4ade80' }}>Ingreso</td>
                  <td>Hoy</td>
                  <td style={{ textAlign: 'right', color: '#4ade80', fontWeight: 'bold' }}>+${ingresosInscripciones.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '15px 0' }}>Mantenimiento de infraestructura y plataformas</td>
                  <td style={{ color: '#f87171' }}>Gasto</td>
                  <td>Ayer</td>
                  <td style={{ textAlign: 'right', color: '#f87171', fontWeight: 'bold' }}>-${gastosFijos.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>


      {modalConfig.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: theme.surface, padding: '30px', borderRadius: '10px',
            width: '400px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ marginTop: 0, color: theme.primary }}>
              {modalConfig.type.includes('CREATE') ? 'Crear Nuevo' : 'Editar Registro'}
            </h2>

            <form onSubmit={handleSubmitModal}>
              {modalConfig.type.includes('MIEMBRO') ? (
                <>
                  <input style={inputStyle} name="primer_nombre" placeholder="Primer Nombre" value={formData.primer_nombre || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="primer_apellido" placeholder="Primer Apellido" value={formData.primer_apellido || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="num_doc" placeholder="Número de Documento" value={formData.num_doc || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="rol" placeholder="Rol (Ej. Cliente, Administrador)" value={formData.rol || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="estado_cuenta" placeholder="Estado (Ej. Activo, Inactivo)" value={formData.estado_cuenta || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="correo" type="email" placeholder="Correo electrónico" value={formData.correo || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="password" type="text" placeholder="Contraseña de acceso" value={formData.password || ''} onChange={handleInputChange} required={modalConfig.type.includes('CREATE')} />
                </>
              ) : (
                <>

                  <input style={inputStyle} name="nombre" placeholder="Nombre de la clase (Ej. CrossFit)" value={formData.nombre || formData.titulo || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="instructor" placeholder="Nombre del Instructor" value={formData.instructor || formData.entrenador || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="horario" placeholder="Horario o Día (Ej. Lunes 18:00)" value={formData.horario || formData.dia || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="duracion" placeholder="Duración (Ej. 60 min)" value={formData.duracion || ''} onChange={handleInputChange} />
                  <input style={inputStyle} name="cupos" type="number" placeholder="Cupos máximos" value={formData.cupos || formData.capacidad || ''} onChange={handleInputChange} />
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={closeModal} style={{ padding: '10px 15px', background: 'transparent', color: '#888', border: 'none', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ padding: '10px 20px', background: theme.primary, color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}