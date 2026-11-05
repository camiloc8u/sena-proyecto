import React from 'react';
import { theme } from '../theme';

export default function Resumen({ miembrosCount, clasesCount, balanceNeto }) {
  return (
    <div>
      <h2>Resumen General</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, minWidth: '200px', border: `1px solid ${theme.border}` }}>
          <p style={{ margin: 0, color: '#888' }}>👥 Miembros Registrados</p>
          <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>{miembrosCount}</h3>
        </div>
        <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, minWidth: '200px', border: `1px solid ${theme.border}` }}>
          <p style={{ margin: 0, color: '#888' }}>🏋️ Clases Ofertadas</p>
          <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', color: theme.primary }}>{clasesCount}</h3>
        </div>
        <div style={{ padding: '20px', background: theme.bg, borderRadius: '5px', flex: 1, minWidth: '200px', border: `1px solid ${theme.border}` }}>
          <p style={{ margin: 0, color: '#888' }}>💰 Balance Mensual Est.</p>
          <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', color: balanceNeto >= 0 ? '#99FF00' : '#ff4d4d' }}>
            ${balanceNeto.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
}