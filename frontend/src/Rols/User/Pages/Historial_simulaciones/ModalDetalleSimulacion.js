import React, { useState } from 'react';

function formatCLP(value) {
  return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}


const ModalDetalleSimulacion = ({ simulacion, onClose, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  if (!simulacion) return null;

  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:'12px',padding:'2rem',minWidth:'340px',maxWidth:'90vw',maxHeight:'90vh',boxShadow:'0 2px 16px #0002',position:'relative',overflow:'hidden'}}>
        <button onClick={onClose} style={{position:'absolute',top:12,right:16,fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer'}}>&times;</button>
        <div style={{overflowY:'auto',maxHeight:'75vh',paddingRight:'0.5rem'}}>
        <h2 style={{marginBottom:'1rem'}}>Detalle de Simulación</h2>
        <div style={{marginBottom:'1.2rem'}}>
          <strong>Tipo:</strong> {simulacion.tipo_prestamo}<br/>
          <strong>Monto:</strong> {formatCLP(Number(simulacion.monto_simulado))}<br/>
          <strong>Plazo:</strong> {simulacion.plazo_simulado} meses<br/>
          <strong>Tasa:</strong> {(simulacion.tasa_aplicada * 100).toFixed(2)}%<br/>
          <strong>Cuota:</strong> {formatCLP(Number(simulacion.cuota_calculada))}<br/>
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

        {/* Detalles de scoring si existen */}
        {simulacion.scoring_detalle && (
          <div style={{marginTop:'1.5rem',background:'#f3f4f6',padding:'1rem 1.5rem',borderRadius:'10px'}}>
            <h3 style={{marginTop:0,marginBottom:'0.7rem',color:'#2563eb'}}>Scoring Crediticio</h3>
            {typeof simulacion.scoring_detalle === 'string' ? (() => {
              try { return JSON.parse(simulacion.scoring_detalle); } catch { return null; }
            })() : null}
            <ul style={{listStyle:'none',padding:0,fontSize:'1rem'}}>
              {(() => {
                let s = simulacion.scoring_detalle;
                if (typeof s === 'string') {
                  try { s = JSON.parse(s); } catch { s = null; }
                }
                if (!s) return <li>No hay detalles de scoring.</li>;
                return <>
                  {s.scoring !== undefined && <li><b>Puntaje:</b> {s.scoring} / 100</li>}
                  {s.estado && <li><b>Estado:</b> {s.estado}</li>}
                  {s.dicom !== undefined && <li><b>DICOM:</b> {s.dicom ? 'Sí' : 'No'}</li>}
                  {s.pensionAlimenticia !== undefined && <li><b>Pensión alimenticia:</b> {s.pensionAlimenticia ? 'Sí' : 'No'}</li>}
                  {s.ingresos !== undefined && <li><b>Ingresos:</b> {formatCLP(Number(s.ingresos))}</li>}
                  {s.historial && <li><b>Historial:</b> {s.historial}</li>}
                  {s.antiguedad !== undefined && <li><b>Antigüedad:</b> {s.antiguedad} años</li>}
                  {s.endeudamiento !== undefined && <li><b>Endeudamiento:</b> {s.endeudamiento}%</li>}
                  {s.breakdown && (
                    <li style={{marginTop:'0.7rem'}}>
                      <b>Detalle de puntaje:</b>
                      <ul style={{marginTop:'0.3rem',marginLeft:'1.2rem'}}>
                        {Object.entries(s.breakdown).map(([k,v]) => <li key={k}>{k}: {v}</li>)}
                      </ul>
                    </li>
                  )}
                </>;
              })()}
            </ul>
          </div>
        )}
        <button
          onClick={() => setShowConfirm(true)}
          style={{background:'#b91c1c',color:'#fff',border:'none',borderRadius:'6px',padding:'0.7rem 1.2rem',fontWeight:700,fontSize:'1rem',cursor:'pointer',marginBottom:'0.5rem'}}
        >
          Borrar simulación
        </button>
        </div>

        {showConfirm && (
          <div style={{
            position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.35)',zIndex:1100,
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:'14px',padding:'2.2rem 2rem',minWidth:'320px',maxWidth:'90vw',boxShadow:'0 2px 24px #0003',textAlign:'center',position:'relative'}}>
              <h2 style={{color:'#b91c1c',marginBottom:'1rem'}}>¿Seguro que quieres borrar esta simulación?</h2>
              <p style={{marginBottom:'1.5rem',color:'#444'}}>Esta acción <b>no se puede revertir</b> y se eliminarán todos los datos asociados a esta simulación.</p>
              <div style={{display:'flex',justifyContent:'center',gap:'1.2rem'}}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{background:'#e5e7eb',color:'#222',border:'none',borderRadius:'6px',padding:'0.6rem 1.3rem',fontWeight:600,fontSize:'1rem',cursor:'pointer'}}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => { setShowConfirm(false); onDelete(simulacion.id); }}
                  style={{background:'#b91c1c',color:'#fff',border:'none',borderRadius:'6px',padding:'0.6rem 1.3rem',fontWeight:700,fontSize:'1rem',cursor:'pointer'}}
                >
                  Sí, borrar
                </button>
              </div>
              <button onClick={() => setShowConfirm(false)} style={{position:'absolute',top:10,right:16,fontSize:'1.3rem',background:'none',border:'none',cursor:'pointer',color:'#b91c1c'}}>&times;</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDetalleSimulacion;
