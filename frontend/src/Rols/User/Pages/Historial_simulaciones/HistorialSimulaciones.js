import React, { useEffect, useState } from 'react';
import ModalDetalleSimulacion from './ModalDetalleSimulacion';

function formatCLP(value) {
  return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

const HistorialSimulaciones = ({ user }) => {
  const [detalleSim, setDetalleSim] = useState(null);
  const [simulaciones, setSimulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filtroMonto, setFiltroMonto] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const PAGE_SIZE = 10;

  const handleDeleteSimulacion = async (id) => {
    if (!user || !user.token) return;
    try {
      await fetch(`http://localhost:3100/api/simulaciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      setSimulaciones(sims => sims.filter(s => s.id !== id));
      setDetalleSim(null);
    } catch (err) {
      alert('Error al borrar simulación');
    }
  };

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
          // Ordenar por fecha descendente
          const ordenadas = [...data.simulaciones].sort((a, b) => new Date(b.fecha_simulacion) - new Date(a.fecha_simulacion));
          setSimulaciones(ordenadas);
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

  // Filtros
  const simulacionesFiltradas = simulaciones.filter(sim => {
    let ok = true;
    if (filtroMonto && filtroMonto.trim() !== '') {
      ok = ok && sim.monto_simulado >= parseInt(filtroMonto);
    }
    if (filtroTipo && filtroTipo !== '') {
      // Normalizar ambos valores para evitar problemas de mayúsculas/minúsculas
      ok = ok && sim.tipo_prestamo.toLowerCase() === filtroTipo.toLowerCase();
    }
    if (filtroFecha && filtroFecha !== '') {
      // Comparar solo la fecha (YYYY-MM-DD)
      const fechaSim = new Date(sim.fecha_simulacion).toISOString().slice(0,10);
      ok = ok && fechaSim === filtroFecha;
    }
    return ok;
  });
  // Paginación
  const totalPages = Math.ceil(simulacionesFiltradas.length / PAGE_SIZE);
  const simulacionesPagina = simulacionesFiltradas.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div className="advanced-simulator">
      <h2>Historial de Simulaciones</h2>
      <div style={{display:'flex',gap:'1rem',margin:'1rem 0',flexWrap:'wrap'}}>
        <div>
          <label style={{fontWeight:500}}>Monto mínimo:&nbsp;</label>
          <input type="number" min="0" value={filtroMonto} onChange={e=>{setFiltroMonto(e.target.value);setPage(1);}} style={{padding:'4px 8px',borderRadius:'4px',border:'1px solid #d1d5db'}} placeholder="Ej: 1000000" />
        </div>
        <div>
          <label style={{fontWeight:500}}>Tipo de préstamo:&nbsp;</label>
          <select value={filtroTipo} onChange={e=>{setFiltroTipo(e.target.value);setPage(1);}} style={{padding:'4px 8px',borderRadius:'4px',border:'1px solid #d1d5db'}}>
            <option value="">Todos</option>
            <option value="personal">Personal</option>
            <option value="automotriz">Automotriz</option>
            <option value="hipotecario">Hipotecario</option>
            <option value="empresarial">Empresarial</option>
          </select>
        </div>
        <div>
          <label style={{fontWeight:500}}>Fecha:&nbsp;</label>
          <input type="date" value={filtroFecha} onChange={e=>{setFiltroFecha(e.target.value);setPage(1);}} style={{padding:'4px 8px',borderRadius:'4px',border:'1px solid #d1d5db'}} />
        </div>
      </div>
      <div style={{margin:'0.5rem 0',fontWeight:500,fontSize:'1rem',color:'#2563eb',display:'flex',gap:'2rem',alignItems:'center'}}>
        <span>Total de simulaciones registradas: {simulaciones.length}</span>
        <span>Total encontradas con filtros: {simulacionesFiltradas.length}</span>
      </div>
      {simulacionesFiltradas.length === 0 ? (
        <div style={{textAlign:'center',marginTop:'2rem',color:'#b91c1c',fontWeight:500,padding:'1.5rem 0'}}>
          <span style={{fontSize:'2.2rem',display:'block',marginBottom:'0.5rem'}}>🔎</span>
          <span style={{fontSize:'1.1rem'}}>No se han encontrado simulaciones que coincidan con los filtros seleccionados.</span><br/>
          <span style={{fontWeight:400,color:'#444'}}>Revisa los valores ingresados o prueba eliminando algún filtro para ver más resultados.</span>
        </div>
      ) : (
        <>
        <table style={{width:'100%',marginTop:'1.5rem',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f3f4f6',color:'#2563eb',fontWeight:600}}>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Plazo</th>
              <th>Tasa</th>
              <th>Cuota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {simulacionesPagina.map(sim => (
              <tr key={sim.id}>
                <td>{sim.fecha_simulacion ? new Date(sim.fecha_simulacion).toLocaleDateString('es-CL') : ''}</td>
                <td>{sim.tipo_prestamo}</td>
                <td>{formatCLP(Number(sim.monto_simulado))}</td>
                <td>{sim.plazo_simulado} meses</td>
                <td>{(sim.tasa_aplicada * 100).toFixed(2)}%</td>
                <td>{formatCLP(Number(sim.cuota_calculada))}</td>
                <td>
                  <button onClick={() => setDetalleSim(sim)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'6px',padding:'0.3rem 0.7rem',fontWeight:500,cursor:'pointer'}}>Ver detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',justifyContent:'center',marginTop:'18px',gap:'8px'}}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{padding:'6px 16px',borderRadius:'6px',border:'1px solid #d1d5db',background:'#f3f4f6',color:'#001763',fontWeight:500,cursor:page===1?'not-allowed':'pointer'}}>Anterior</button>
          <span style={{alignSelf:'center'}}>Página {page} de {totalPages}</span>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{padding:'6px 16px',borderRadius:'6px',border:'1px solid #d1d5db',background:'#f3f4f6',color:'#001763',fontWeight:500,cursor:page===totalPages?'not-allowed':'pointer'}}>Siguiente</button>
        </div>
        {detalleSim && (
          <ModalDetalleSimulacion
            simulacion={detalleSim}
            onClose={() => setDetalleSim(null)}
            onDelete={handleDeleteSimulacion}
          />
        )}
        </>
      )}
    </div>
  );
};

export default HistorialSimulaciones;
