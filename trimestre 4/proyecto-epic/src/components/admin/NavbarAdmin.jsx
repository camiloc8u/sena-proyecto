import React, { useState, useEffect } from 'react';

const API_MIEMBROS = 'https://69c2c5f37518bf8facbf7620.mockapi.io/Usuario';
const API_CLASES = 'https://69dc3d4084f912a264037cde.mockapi.io/clases';

export default function NavbarAdmin() {
  const [activeTab, setActiveTab] = useState('RESUMEN');
  const [miembros, setMiembros] = useState([]);
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({});

  const tabs = ['RESUMEN', 'MIEMBROS', 'CLASES', 'FINANZAS'];

  const fetchMiembros = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_MIEMBROS);
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
      const data = await response.json();
      setClases(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

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
    const method = type.includes('CREATE') ? 'POST' : 'PUT';
    const finalUrl = method === 'PUT' ? `${url}/${data.id}` : url;

    try {
      await fetch(finalUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
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
    
    await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (isMiembro) fetchMiembros();
    else fetchClases();
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };

  const theme = {
    bg: '#111111', surface: '#1a1a1a', text: '#ffffff',
    primary: '#99FF00', border: '#333333',
    inputBg: '#2a2a2a'
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
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>👥 Miembros Activos</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>{miembros.length || 5}</h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'MIEMBROS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Gestión de Miembros</h2>
              <button 
                onClick={() => openModal('CREATE_MIEMBRO')} 
                style={{ background: theme.primary, color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                + NUEVO MIEMBRO
              </button>
            </div>

            {loading ? <p style={{ color: theme.primary }}>Cargando datos...</p> : (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.border}`, color: '#888' }}>
                    <th style={{ padding: '10px 0' }}>NOMBRE</th>
                    <th>PLAN</th>
                    <th>ESTADO</th>
                    <th>EMAIL</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {miembros.map(m => (
                    <tr key={m.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={{ padding: '15px 0' }}>{ m.nombre || 'Sin nombre'}</td>
                      <td style={{ color: theme.primary }}>{m.Plan || 'Sin plan'}</td>
                      <td>{m.Estado || 'Activo'}</td>
                      <td>{m.email || 'Sin email'}</td>
                      <td>
                        <button onClick={() => openModal('EDIT_MIEMBRO', m)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }} title="Editar">✏️</button>
                        <button onClick={() => handleEliminar(m.id, true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }} title="Eliminar">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'CLASES' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Clases Programadas</h2>
              <button 
                onClick={() => openModal('CREATE_CLASE')} 
                style={{ background: theme.primary, color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                + NUEVA CLASE
              </button>
            </div>

            {loading ? <p style={{ color: theme.primary }}>Cargando clases...</p> : (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.border}`, color: '#888' }}>
                    <th style={{ padding: '10px 0' }}>CLASE</th>
                    <th>INSTRUCTOR</th>
                    <th>HORARIO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {clases.map(c => (
                    <tr key={c.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={{ padding: '15px 0', fontWeight: 'bold' }}>{ c.nombre || 'Sin nombre'}</td>
                      <td style={{ color: theme.primary }}>{c.instructor || 'Sin asignar'}</td>
                      <td>{c.horario || 'Sin horario'}</td>
                      <td>
                        <button onClick={() => openModal('EDIT_CLASE', c)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }} title="Editar">✏️</button>
                        <button onClick={() => handleEliminar(c.id, false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }} title="Eliminar">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'FINANZAS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Reporte de Finanzas</h2>
              <button style={{ background: theme.primary, color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                Exportar Reporte
              </button>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>📈 Ingresos Totales</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', color: theme.primary }}>$45,200.00</h3>
              </div>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>📉 Gastos Operativos</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', color: '#ff4d4d' }}>$12,800.00</h3>
              </div>
              <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, border: `1px solid ${theme.border}` }}>
                <p style={{ margin: 0, color: '#888' }}>💵 Beneficio Neto</p>
                <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>$32,400.00</h3>
              </div>
            </div>

            <h3 style={{ borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>Transacciones Recientes</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${theme.border}`, color: '#888' }}>
                  <th style={{ padding: '10px 0' }}>FECHA</th>
                  <th>DESCRIPCIÓN</th>
                  <th>TIPO</th>
                  <th>MONTO</th>
                  <th>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '15px 0' }}>13 Abr 2026</td>
                  <td>Mensualidad VIP - Carlos Ruiz</td>
                  <td style={{ color: theme.primary }}>Ingreso</td>
                  <td>$80.00</td>
                  <td><span style={{ background: '#2a2a2a', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' }}>Completado</span></td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '15px 0' }}>12 Abr 2026</td>
                  <td>Mantenimiento Caminadoras</td>
                  <td style={{ color: '#ff4d4d' }}>Gasto</td>
                  <td>$350.00</td>
                  <td><span style={{ background: '#2a2a2a', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' }}>Completado</span></td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '15px 0' }}>10 Abr 2026</td>
                  <td>Plan Anual - Maria Gomez</td>
                  <td style={{ color: theme.primary }}>Ingreso</td>
                  <td>$450.00</td>
                  <td><span style={{ background: '#333300', color: 'yellow', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' }}>Pendiente</span></td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '15px 0' }}>08 Abr 2026</td>
                  <td>Pago Servicios (Agua/Luz)</td>
                  <td style={{ color: '#ff4d4d' }}>Gasto</td>
                  <td>$120.00</td>
                  <td><span style={{ background: '#2a2a2a', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' }}>Completado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>

      {modalConfig.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
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
                  <input style={inputStyle} name="nombre" placeholder="Nombre completo" value={formData.nombre || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="Plan" placeholder="Tipo de Plan (Ej. Mensual, VIP)" value={formData.Plan || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="Estado" placeholder="Estado (Ej. Activo, Inactivo)" value={formData.Estado || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="email" type="email" placeholder="Correo electrónico" value={formData.email || ''} onChange={handleInputChange} required />
                </>
              ) : (
                <>
                  <input style={inputStyle} name="nombre" placeholder="Nombre de la clase (Ej. Yoga)" value={formData.nombre || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="instructor" placeholder="Nombre del Instructor" value={formData.instructor || ''} onChange={handleInputChange} required />
                  <input style={inputStyle} name="horario" placeholder="Horario (Ej. Lunes 8:00 AM)" value={formData.horario || ''} onChange={handleInputChange} required />
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={closeModal} style={{
                  padding: '10px 15px', background: 'transparent', color: '#888', border: 'none', cursor: 'pointer'
                }}>
                  Cancelar
                </button>
                <button type="submit" style={{
                  padding: '10px 20px', background: theme.primary, color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                }}>
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