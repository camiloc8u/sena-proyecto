import React from 'react';
import { theme } from '../theme';

export default function Clases({ filteredClases, searchClase, setSearchClase, loading, openModal, handleEliminar }) {
  return (
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
  );
}