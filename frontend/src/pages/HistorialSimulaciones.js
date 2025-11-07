import React, { useEffect, useState } from 'react';

function formatCLP(value) {
  return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

const HistorialSimulaciones = ({ user }) => {
  const [simulaciones, setSimulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    if (!user || !user.token) return;
  fetch('http://localhost:3100/api/simulaciones', {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setSimulaciones(data.simulaciones);
        } else {
          setError(data.error || 'Error al cargar historial');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error de conexión');
        setLoading(false);
      });
  }, [user]);

  if (!user) return <div style={{textAlign:'center',marginTop:'2rem'}}>Debes iniciar sesión para ver tu historial.</div>;
  if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Cargando historial...</div>;
  if (error) return <div style={{textAlign:'center',marginTop:'2rem',color:'#b91c1c'}}>{error}</div>;

  // Paginación
  const totalPages = Math.ceil(simulaciones.length / PAGE_SIZE);
  const simulacionesPagina = simulaciones.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div className="advanced-simulator">
      <h2>Historial de Simulaciones</h2>
      {simulaciones.length === 0 ? (
        <div style={{textAlign:'center',marginTop:'2rem'}}>No tienes simulaciones guardadas.</div>
      ) : (
        <>
        <table style={{width:'100%',marginTop:'1.5rem',borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Plazo</th>
              <th>Tasa</th>
              <th>Cuota</th>
            </tr>
          </thead>
          <tbody>
            {simulacionesPagina.map(sim => (
              <tr key={sim.id}>
                <td>{new Date(sim.created_at).toLocaleDateString()}</td>
                <td>{sim.tipo_prestamo}</td>
                <td>{formatCLP(sim.monto_simulado)}</td>
                <td>{sim.plazo_simulado} meses</td>
                <td>{(sim.tasa_aplicada * 100).toFixed(2)}%</td>
                <td>{formatCLP(sim.cuota_calculada)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',justifyContent:'center',marginTop:'18px',gap:'8px'}}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{padding:'6px 16px',borderRadius:'6px',border:'1px solid #d1d5db',background:'#f3f4f6',color:'#001763',fontWeight:500,cursor:page===1?'not-allowed':'pointer'}}>Anterior</button>
          <span style={{alignSelf:'center'}}>Página {page} de {totalPages}</span>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{padding:'6px 16px',borderRadius:'6px',border:'1px solid #d1d5db',background:'#f3f4f6',color:'#001763',fontWeight:500,cursor:page===totalPages?'not-allowed':'pointer'}}>Siguiente</button>
        </div>
        </>
      )}
    </div>
  );
};

export default HistorialSimulaciones;
