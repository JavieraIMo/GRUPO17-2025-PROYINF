import React from 'react';

function formatCLP(value) {
  return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

const ModalDetalleSimulacion = ({ simulacion, onClose, onDelete }) => {
  if (!simulacion) return null;

  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:'12px',padding:'2rem',minWidth:'340px',maxWidth:'90vw',boxShadow:'0 2px 16px #0002',position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute',top:12,right:16,fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer'}}>&times;</button>
        <h2 style={{marginBottom:'1rem'}}>Detalle de Simulación</h2>
        <div style={{marginBottom:'1.2rem'}}>
          <strong>Tipo:</strong> {simulacion.tipo_prestamo}<br/>
          <strong>Monto:</strong> {formatCLP(simulacion.monto_simulado)}<br/>
          <strong>Plazo:</strong> {simulacion.plazo_simulado} meses<br/>
          <strong>Tasa:</strong> {(simulacion.tasa_aplicada * 100).toFixed(2)}%<br/>
          <strong>Cuota:</strong> {formatCLP(simulacion.cuota_calculada)}<br/>
          <strong>Fecha:</strong> {simulacion.fecha_simulacion ? new Date(simulacion.fecha_simulacion).toLocaleDateString('es-CL') : ''}<br/>
        </div>
        {simulacion.datos_adicionales && Array.isArray(simulacion.datos_adicionales) && (
          <>
            <h3 style={{marginBottom:'0.7rem'}}>Tabla de Amortización (12 meses)</h3>
            <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'1.2rem'}}>
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Cuota</th>
                  <th>Capital</th>
                  <th>Interés</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {simulacion.datos_adicionales.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.mes}</td>
                    <td>{formatCLP(row.cuota)}</td>
                    <td>{formatCLP(row.capital)}</td>
                    <td>{formatCLP(row.interes)}</td>
                    <td>{formatCLP(row.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        <button onClick={() => onDelete(simulacion.id)} style={{background:'#b91c1c',color:'#fff',border:'none',borderRadius:'6px',padding:'0.7rem 1.2rem',fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>Borrar simulación</button>
      </div>
    </div>
  );
};

export default ModalDetalleSimulacion;
