import './LoanSimulator.css';
import React, { useState } from 'react';

function formatCLP(value) {
  return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

const MIN_AMOUNT = 100000;
const MAX_AMOUNT = 50000000;
const TERMS = [12, 24, 36, 48, 60];
const ANNUAL_RATE = 0.08;

function calculateLoan(amount, term) {
  const monthlyRate = ANNUAL_RATE / 12;
  // Fórmula de cuota fija: M = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const n = term;
  const r = monthlyRate;
  const M = amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total = M * n;
  const interest = total - amount;
  return {
    monthlyPayment: M,
    totalPayment: total,
    interest: interest
  };
}

const LoanSimulator = () => {
  const [amount, setAmount] = useState(MIN_AMOUNT);
  const [term, setTerm] = useState(TERMS[0]);
  const [result, setResult] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) return;
    const res = calculateLoan(amount, term);
    setResult(res);
  };

  return (
    <div className="loan-simulator">
      <h2>Simulador de Préstamos</h2>
      <div style={{
        background: '#f3f4f6',
        color: '#374151',
        borderRadius: '8px',
        padding: '10px 16px',
        marginBottom: '18px',
        fontSize: '1rem',
        textAlign: 'center',
        fontWeight: 500
      }}>
        Para mayor exactitud en la simulación, <span style={{color: '#001763', fontWeight: 700}}>regístrate</span> y obtén condiciones personalizadas.
      </div>
      <form onSubmit={handleSimulate}>
        <div>
          <label>Monto (CLP):</label>
          <input
            type="range"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step={10000}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            style={{marginBottom: '8px'}}
          />
          <input
            type="number"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step={10000}
            value={amount}
            onChange={e => {
              let val = Number(e.target.value);
              if (val < MIN_AMOUNT) val = MIN_AMOUNT;
              if (val > MAX_AMOUNT) val = MAX_AMOUNT;
              setAmount(val);
            }}
            style={{width: '100%', marginBottom: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem'}}
          />
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#6b7280', marginTop: '2px'}}>
            <span>Mín: {formatCLP(MIN_AMOUNT)}</span>
            <span>Máx: {formatCLP(MAX_AMOUNT)}</span>
          </div>
          <div style={{marginTop: '8px', fontWeight: 'bold', color: '#001763', fontSize: '1.1rem'}}>Monto seleccionado: {formatCLP(amount)}</div>
        </div>
        <div>
          <label>Plazo (meses): </label>
          <select value={term} onChange={e => setTerm(Number(e.target.value))}>
            {TERMS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <button type="submit">Simular</button>
      </form>
      {result && (
        <div className="loan-results">
          <h3>Resultados</h3>
          <p>Cuota mensual: <strong>{formatCLP(result.monthlyPayment)}</strong></p>
          <p>Total a pagar: <strong>{formatCLP(result.totalPayment)}</strong></p>
          <p>Intereses: <strong>{formatCLP(result.interest)}</strong></p>
          <p>Tasa fija anual: <strong>8%</strong></p>
        </div>
      )}
    </div>
  );
};

export default LoanSimulator;
