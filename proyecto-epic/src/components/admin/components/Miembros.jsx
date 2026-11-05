import React from 'react';
import { theme } from '../theme';

export default function Miembros({ filteredMiembros, searchMiembro, setSearchMiembro, loading, openModal, handleEliminar }) {
  return (
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
  );
}