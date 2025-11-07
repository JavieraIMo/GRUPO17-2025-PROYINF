import React from 'react';
import './LoanLogic.css';

function BasicLoanLogic() {
  return (
    <div className="loan-logic-page">
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
          <li>Para condiciones personalizadas, <strong>regístrate</strong> y usa el simulador avanzado.</li>
        </ul>
      </section>
    </div>
  );
}

export default BasicLoanLogic;
