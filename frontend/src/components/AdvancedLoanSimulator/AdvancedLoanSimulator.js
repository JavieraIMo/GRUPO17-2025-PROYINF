import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedLoanSimulator.css';

const LOAN_TYPES = [
  { label: 'Personal', value: 'personal', rate: 0.12 },
  { label: 'Automotriz', value: 'automotriz', rate: 0.09 },
  { label: 'Hipotecario', value: 'hipotecario', rate: 0.07 },
  { label: 'Empresarial', value: 'empresarial', rate: 0.15 },
];

function formatCLP(value) {
  return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

function calculateAmortization(monto, plazo, tasa) {
  const cuota = (monto * (tasa / 12)) / (1 - Math.pow(1 + tasa / 12, -plazo));
  let saldo = monto;
  const tabla = [];
  for (let i = 1; i <= Math.min(plazo, 12); i++) {
    const interes = saldo * (tasa / 12);
    const capital = cuota - interes;
    saldo -= capital;
    tabla.push({
      mes: i,
      cuota: cuota,
      capital: capital,
      interes: interes,
      saldo: saldo > 0 ? saldo : 0,
    });
  }
  return { cuota, tabla };
}

const AdvancedLoanSimulator = ({ user }) => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('personal');
  const [monto, setMonto] = useState(1000000);
  const [plazo, setPlazo] = useState(12);
  const [resultados, setResultados] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    const tipoObj = LOAN_TYPES.find(t => t.value === tipo);
    if (tipoObj && monto > 0 && plazo > 0) {
      const { cuota, tabla } = calculateAmortization(monto, plazo, tipoObj.rate);
      setResultados({ cuota, tabla, tasa: tipoObj.rate });
      // Guardado automático al simular
      if (user) {
        handleGuardarSimulacion({ tipo, monto, plazo, tasa: tipoObj.rate, cuota, tabla });
      }
    }
  };

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleGuardarSimulacion = async () => {
    // Recibe los datos como argumento para guardado automático
    if (!user) return;
    setGuardando(true);
    setMensaje(null);
    try {
      const response = await fetch('http://localhost:3100/api/simulaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(arguments[0]),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setMensaje('Simulación guardada exitosamente.');
      } else {
        setMensaje('Error al guardar la simulación.');
      }
    } catch (error) {
      setMensaje('Error de conexión al guardar.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="advanced-simulator">
      <h2>Simulador Avanzado de Préstamos</h2>
      {/* Botón eliminado, el link se muestra al final */}
      <form className="sim-form" onSubmit={handleSimulate}>
        <label>Tipo de préstamo:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          {LOAN_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <label>Monto (CLP):</label>
        <input type="number" min="100000" max="100000000" value={monto} onChange={e => setMonto(Number(e.target.value))} />
        <label>Plazo (meses):</label>
        <input type="number" min="6" max="360" value={plazo} onChange={e => setPlazo(Number(e.target.value))} />
        <button type="submit" style={{width: '100%', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.7rem 0', fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', marginTop: '8px'}}>Simular</button>
      </form>
      {resultados && (
        <div className="sim-results">
          <h3>Resultados</h3>
          <p><strong>Cuota mensual:</strong> {typeof resultados.cuota === 'number' ? formatCLP(resultados.cuota) : JSON.stringify(resultados.cuota)}</p>
          <p><strong>Tasa anual:</strong> {typeof resultados.tasa === 'number' ? (resultados.tasa * 100).toFixed(2) + '%' : JSON.stringify(resultados.tasa)}</p>
          <h4>Tabla de Amortización (12 meses)</h4>
          <table>
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
              {Array.isArray(resultados.tabla) && resultados.tabla.map(row => (
                <tr key={row.mes}>
                  <td>{typeof row.mes === 'number' ? row.mes : JSON.stringify(row.mes)}</td>
                  <td>{typeof row.cuota === 'number' ? formatCLP(row.cuota) : JSON.stringify(row.cuota)}</td>
                  <td>{typeof row.capital === 'number' ? formatCLP(row.capital) : JSON.stringify(row.capital)}</td>
                  <td>{typeof row.interes === 'number' ? formatCLP(row.interes) : JSON.stringify(row.interes)}</td>
                  <td>{typeof row.saldo === 'number' ? formatCLP(row.saldo) : JSON.stringify(row.saldo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {mensaje && (
            <div style={{marginTop:'10px',color:mensaje.includes('exitosamente')?'#059669':'#b91c1c',fontWeight:500}}>{mensaje}</div>
          )}
        </div>
      )}
      <div style={{textAlign: 'center', marginTop: '18px'}}>
        <a href="/logica-simulador" style={{color: '#001763', textDecoration: 'underline', fontWeight: 500, fontSize: '1rem'}}>
          Ver cómo se calcula la cuota
        </a>
      </div>
    </div>
  );
};

export default AdvancedLoanSimulator;
