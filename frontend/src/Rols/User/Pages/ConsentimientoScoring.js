import React, { useState } from 'react';
import './ConsentimientoScoring.css';

function ConsentimientoScoring({ onConsent }) {
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!acepta) {
      setError('Debes aceptar para continuar con la simulación personalizada.');
      return;
    }
    setError('');
    onConsent();
  };

  return (
    <form className="consentimiento-form" onSubmit={handleSubmit}>
      <h2>Simulación Personalizada</h2>
      <p>
        Para ofrecerte condiciones reales y una preaprobación técnica, necesitamos tu consentimiento para consultar tu información crediticia (DICOM u otra fuente de scoring).
      </p>
      <label className="consent-checkbox">
        <input
          type="checkbox"
          checked={acepta}
          onChange={e => setAcepta(e.target.checked)}
        />
        Autorizo expresamente a ALARA a consultar mi información crediticia para esta simulación.
      </label>
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Continuar</button>
    </form>
  );
}

export default ConsentimientoScoring;
