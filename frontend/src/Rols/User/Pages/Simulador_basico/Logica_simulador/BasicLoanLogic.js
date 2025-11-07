import React from 'react';

function BasicLoanLogic() {
  return (
    <div className="loan-logic-page">
      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',marginBottom:'1.5rem'}}>
        <a href="/simulador" style={{background:'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',color:'#fff',padding:'0.7rem 1.5rem',borderRadius:'8px',textDecoration:'none',fontWeight:600,fontFamily:'Montserrat, Arial, sans-serif',boxShadow:'0 2px 8px rgba(37,99,235,0.12)',border:'none',transition:'background 0.2s, box-shadow 0.2s',letterSpacing:'0.5px',position:'relative',cursor:'pointer'}}
          onMouseOver={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #1e40af 0%, #2563eb 100%)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.12)';
          }}
        >
          ← Volver a Simulador Básico
        </a>
      </div>
      <h1>Lógica del Simulador Básico</h1>
      <section className="logic-section">
        <h2>¿Cómo se calcula la cuota mensual?</h2>
        <p>
          El simulador básico utiliza la <strong>fórmula de cuota fija</strong> para préstamos personales con tasa anual fija del 8%:
        </p>
        <div className="formula-box">
          <span className="formula">M = P × r × (1 + r)<sup>n</sup> / [(1 + r)<sup>n</sup> - 1]</span>
        </div>
        <ul>
          <li><strong>M</strong>: Cuota mensual</li>
          <li><strong>P</strong>: Monto solicitado</li>
          <li><strong>r</strong>: Tasa de interés mensual (8% anual / 12)</li>
          <li><strong>n</strong>: Número de meses (plazo)</li>
        </ul>
        <h3>Ejemplo</h3>
        <p>Si solicitas <strong>$1.000.000</strong> a <strong>24 meses</strong>:</p>
        <ul>
          <li>Tasa mensual: 8% / 12 = 0.00667</li>
          <li>n = 24</li>
          <li>P = $1.000.000</li>
        </ul>
        <p>La cuota mensual se calcula así:</p>
        <div className="formula-box">
          <span className="formula">M = 1.000.000 × 0.00667 × (1 + 0.00667)<sup>24</sup> / [(1 + 0.00667)<sup>24</sup> - 1]</span>
        </div>
        <p>El resultado es la cuota que pagarías cada mes. El simulador también muestra el <strong>total a pagar</strong> y los <strong>intereses</strong> generados.</p>
        <h3>Notas</h3>
        <ul>
          <li>La simulación es referencial y no considera seguros ni otros gastos asociados.</li>
        </ul>
      </section>
      {/* Botón movido arriba */}
    </div>
  );
}

export default BasicLoanLogic;
