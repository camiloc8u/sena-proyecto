import React from 'react';
import { theme, inputStyle } from '../theme';

export default function ModalForm({ modalConfig, formData, handleInputChange, handleSubmitModal, closeModal }) {
  if (!modalConfig.isOpen) return null;

  const isMiembro = modalConfig.type.includes('MIEMBRO');
  const isCreate = modalConfig.type.includes('CREATE');

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: theme.surface, padding: '30px', borderRadius: '10px',
        width: '400px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ marginTop: 0, color: theme.primary }}>
          {isCreate ? 'Crear Nuevo' : 'Editar Registro'}
        </h2>

        <form onSubmit={handleSubmitModal}>
          {isMiembro ? (
            <>
              <input style={inputStyle} name="primer_nombre" placeholder="Primer Nombre" value={formData.primer_nombre || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="primer_apellido" placeholder="Primer Apellido" value={formData.primer_apellido || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="num_doc" placeholder="Número de Documento" value={formData.num_doc || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="rol" placeholder="Rol (Ej. Cliente, Administrador)" value={formData.rol || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="estado_cuenta" placeholder="Estado (Ej. Activo, Inactivo)" value={formData.estado_cuenta || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="correo" type="email" placeholder="Correo electrónico" value={formData.correo || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="password" type="text" placeholder="Contraseña" value={formData.password || ''} onChange={handleInputChange} required={isCreate} />
            </>
          ) : (
            <>
              <input style={inputStyle} name="nombre" placeholder="Nombre de la clase" value={formData.nombre || formData.titulo || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="instructor" placeholder="Instructor" value={formData.instructor || formData.entrenador || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="horario" placeholder="Horario (Ej. Lunes 18:00)" value={formData.horario || formData.dia || ''} onChange={handleInputChange} required />
              <input style={inputStyle} name="duracion" placeholder="Duración" value={formData.duracion || ''} onChange={handleInputChange} />
              <input style={inputStyle} name="cupos" type="number" placeholder="Cupos máximos" value={formData.cupos || formData.capacidad || ''} onChange={handleInputChange} />
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={closeModal} style={{ padding: '10px 15px', background: 'transparent', color: '#888', border: 'none', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding: '10px 20px', background: theme.primary, color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}