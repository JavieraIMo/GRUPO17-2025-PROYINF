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
  const [plazoManual, setPlazoManual] = useState('');
  const [usarPlazoManual, setUsarPlazoManual] = useState(false);
  const [plazoError, setPlazoError] = useState('');
  const navigate = useNavigate();
  const MIN_AMOUNT = 100000;
  const MAX_AMOUNT = 50000000;
  const COMMON_TERMS = [12, 24, 36, 48, 60];
  const [tipo, setTipo] = useState('personal');
  const [monto, setMonto] = useState(MIN_AMOUNT);
  const [plazo, setPlazo] = useState(COMMON_TERMS[0]);
  const [resultados, setResultados] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    const tipoObj = LOAN_TYPES.find(t => t.value === tipo);
    let plazoNum = usarPlazoManual ? Number(plazoManual) : Number(plazo);
    if (tipoObj && monto > 0 && plazoNum >= 6 && plazoNum <= 360) {
      const { cuota, tabla } = calculateAmortization(monto, plazoNum, tipoObj.rate);
      setResultados({ cuota, tabla, tasa: tipoObj.rate });
      // Guardado automático al simular
      if (user) {
        handleGuardarSimulacion({ tipo, monto, plazo: plazoNum, tasa: tipoObj.rate, cuota, tabla });
      }
    } else if (plazoNum < 6) {
      setPlazoError('No es posible el cálculo con menos de 6 meses de plazo.');
    }
  };

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleGuardarSimulacion = async (simData) => {
    // Recibe los datos como argumento para guardado automático
    if (!user) return;
    setGuardando(true);
    setMensaje(null);
    console.log('[ALARA][Frontend] Enviando simulación:', simData);
    try {
      const response = await fetch('http://localhost:3100/api/simulaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(simData),
      });
      const data = await response.json();
      console.log('[ALARA][Frontend] Respuesta backend:', data);
      if (response.ok && data.ok) {
        setMensaje('Simulación guardada exitosamente.');
      } else {
        setMensaje('Error al guardar la simulación.');
      }
    } catch (error) {
      setMensaje('Error de conexión al guardar.');
      console.error('[ALARA][Frontend] Error al guardar simulación:', error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="advanced-simulator">
      <h2>Simulador Avanzado de Préstamos</h2>
      <form className="sim-form" onSubmit={handleSimulate}>
        <label>Tipo de préstamo:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          {LOAN_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <label>Monto (CLP):</label>
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={10000}
          value={monto}
          onChange={e => setMonto(Number(e.target.value))}
          style={{marginBottom: '8px'}}
        />
        <input
          type="number"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={10000}
          value={monto}
          onChange={e => {
            let val = Number(e.target.value);
            if (val < MIN_AMOUNT) val = MIN_AMOUNT;
            if (val > MAX_AMOUNT) val = MAX_AMOUNT;
            setMonto(val);
          }}
          style={{width: '100%', marginBottom: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem'}}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#6b7280', marginTop: '2px'}}>
          <span>Mín: {formatCLP(MIN_AMOUNT)}</span>
          <span>Máx: {formatCLP(MAX_AMOUNT)}</span>
        </div>
        <div style={{marginTop: '8px', fontWeight: 'bold', color: '#001763', fontSize: '1.1rem'}}>Monto seleccionado: {formatCLP(monto)}</div>
        <label>Plazo (meses): <span style={{color:'#6b7280',fontWeight:400}}>(entre 6 y 360 meses)</span></label>
        <select
          value={usarPlazoManual ? 'otro' : plazo}
          onChange={e => {
            if (e.target.value === 'otro') {
              setUsarPlazoManual(true);
              setPlazoManual('');
              setPlazoError('');
            } else {
              setUsarPlazoManual(false);
              setPlazo(Number(e.target.value));
              setPlazoError('');
            }
          }}
          style={{width: '100%', marginBottom: '8px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem'}}
        >
          {COMMON_TERMS.map(t => <option key={t} value={t}>{t} meses</option>)}
          <option value="otro">Otro</option>
        </select>
        {usarPlazoManual && (
          <input
            type="number"
            min={6}
            max={360}
            value={plazoManual}
            placeholder="Escribe el plazo (6-360)"
            onChange={e => {
              const val = e.target.value;
              setPlazoManual(val);
              if (val !== '' && Number(val) < 6) {
                setPlazoError('No es posible el cálculo con menos de 6 meses de plazo.');
              } else {
                setPlazoError('');
              }
            }}
            style={{width: '100%', marginBottom: '8px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem'}}
          />
        )}
        {plazoError && (
          <div style={{color:'#b91c1c',fontWeight:500,marginBottom:'8px'}}>{plazoError}</div>
        )}
        <datalist id="plazo-sugerencias">
          {COMMON_TERMS.map(t => <option key={t} value={t} />)}
        </datalist>
        <button type="submit" style={{width: '100%', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.7rem 0', fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', marginTop: '8px'}}>Simular</button>
      </form>
      {resultados && (
        <div className="sim-results">
          <h3>Resultados</h3>
          <p><strong>Plazo simulado:</strong> {usarPlazoManual ? plazoManual : plazo} meses</p>
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
