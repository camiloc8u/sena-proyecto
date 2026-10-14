import React, { useState, useEffect } from 'react';
import { theme } from './theme';
import Resumen from './components/Resumen';
import Finanzas from './components/Finanzas';
import Miembros from './components/Miembros';
import Clases from './components/Clases';
import ModalForm from './components/ModalForm';

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
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  const fetchClases = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_CLASES);
      if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
      const data = await response.json();
      setClases(data);
    } catch (error) { console.error(error); }
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

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    const { type, data } = modalConfig;
    const isMiembro = type.includes('MIEMBRO');
    const url = isMiembro ? API_MIEMBROS : API_CLASES;
    const isCreate = type.includes('CREATE');
    const method = isCreate ? 'POST' : 'PUT';
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
    } catch (error) { console.error(error); }
  };

  const handleEliminar = async (id, isMiembro) => {
    if (!window.confirm(`¿Seguro que deseas eliminar este registro?`)) return;
    const url = isMiembro ? API_MIEMBROS : API_CLASES;
    try {
      await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (isMiembro) fetchMiembros();
      else fetchClases();
    } catch(error) { console.error(error); }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };

  // Filtros de búsqueda
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

  // Cálculos de finanzas
  const miembrosActivos = miembros.filter(m => m.estado_cuenta === 'Activo' || !m.estado_cuenta).length;
  const precioMembresiaPromedio = 50000;
  const ingresosInscripciones = miembrosActivos * precioMembresiaPromedio;
  const gastosFijos = 150000; 
  const balanceNeto = ingresosInscripciones - gastosFijos;

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
        
        {activeTab === 'RESUMEN' && 
          <Resumen miembrosCount={miembros.length} clasesCount={clases.length} balanceNeto={balanceNeto} />
        }
        
        {activeTab === 'MIEMBROS' && 
          <Miembros 
            filteredMiembros={filteredMiembros} 
            searchMiembro={searchMiembro} 
            setSearchMiembro={setSearchMiembro} 
            loading={loading} 
            openModal={openModal} 
            handleEliminar={handleEliminar} 
          />
        }

        {activeTab === 'CLASES' && 
          <Clases 
            filteredClases={filteredClases} 
            searchClase={searchClase} 
            setSearchClase={setSearchClase} 
            loading={loading} 
            openModal={openModal} 
            handleEliminar={handleEliminar} 
          />
        }

        {activeTab === 'FINANZAS' && 
          <Finanzas 
            ingresos={ingresosInscripciones} 
            gastos={gastosFijos} 
            balance={balanceNeto} 
            miembrosActivos={miembrosActivos} 
          />
        }

      </div>

      <ModalForm 
        modalConfig={modalConfig} 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleSubmitModal={handleSubmitModal} 
        closeModal={closeModal} 
      />
      
    </div>
  );
}