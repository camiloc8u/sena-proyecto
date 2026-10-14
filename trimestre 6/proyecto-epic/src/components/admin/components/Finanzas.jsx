import React from 'react';
import { theme } from '../theme';

export default function Finanzas({ ingresos, gastos, balance, miembrosActivos }) {
  return (
    <div>
      <h2>Panel de Control Financiero</h2>
      <p style={{ color: '#888', marginTop: 0 }}>Métricas calculadas en tiempo real en base a los usuarios activos.</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', marginBottom: '35px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', background: '#1e293b', borderRadius: '6px', flex: 1, minWidth: '220px' }}>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>📈 Ingresos por Mensualidades</p>
          <h3 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#4ade80' }}>${ingresos.toLocaleString()}</h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Basado en {miembrosActivos} clientes activos</span>
        </div>
        <div style={{ padding: '20px', background: '#311b1b', borderRadius: '6px', flex: 1, minWidth: '220px' }}>
          <p style={{ margin: 0, color: '#f87171', fontSize: '14px' }}>📉 Gastos de Operación</p>
          <h3 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#f87171' }}>-${gastos.toLocaleString()}</h3>
          <span style={{ fontSize: '12px', color: '#854d4d' }}>Servicios, mantenimiento y API</span>
        </div>
        <div style={{ padding: '20px', background: balance >= 0 ? '#1b3122' : '#3d1c1c', borderRadius: '6px', flex: 1, minWidth: '220px' }}>
          <p style={{ margin: 0, color: '#a3e635', fontSize: '14px' }}>📊 Utilidad Neta</p>
          <h3 style={{ fontSize: '28px', margin: '10px 0 0 0', color: theme.primary }}>${balance.toLocaleString()}</h3>
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
            <td style={{ textAlign: 'right', color: '#4ade80', fontWeight: 'bold' }}>+${ingresos.toLocaleString()}</td>
          </tr>
          <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
            <td style={{ padding: '15px 0' }}>Mantenimiento de infraestructura y plataformas</td>
            <td style={{ color: '#f87171' }}>Gasto</td>
            <td>Ayer</td>
            <td style={{ textAlign: 'right', color: '#f87171', fontWeight: 'bold' }}>-${gastos.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}