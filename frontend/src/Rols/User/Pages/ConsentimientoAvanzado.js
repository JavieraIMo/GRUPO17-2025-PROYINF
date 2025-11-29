import React, { useState } from 'react';
import './ConsentimientoAvanzado.css';


function ConsentimientoAvanzado({ onAccept }) {
  const [checks, setChecks] = useState({
    datos: false,
    claveUnica: false, // obligatorio
    scoring: false,
    dicom: false,
    biometria: false
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, checked } = e.target;
    setChecks(c => ({ ...c, [name]: checked }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!checks.claveUnica) {
      setError('Debes aceptar la validación de identidad mediante ClaveÚnica para continuar.');
      return;
    }
    setError('');
    if (!checks.datos || !checks.scoring || !checks.dicom || !checks.biometria) {
      if (!window.confirm('No aceptaste todos los consentimientos. El proceso será más lento y requerirá validaciones adicionales. ¿Deseas continuar?')) {
        return;
      }
    }
    onAccept();
  };

  return (
    <form className="consentimiento-avanzado-form" onSubmit={handleSubmit} style={{maxWidth:480,margin:'0 auto',background:'#fff',padding:'2rem',borderRadius:14,boxShadow:'0 2px 16px #0002'}}>
      <h2>Consentimiento para Solicitud de Préstamo</h2>
      <ul style={{margin:'1rem 0 1.5rem 0',padding:0,listStyle:'none'}}>
        <li><label><input type="checkbox" name="datos" checked={checks.datos} onChange={handleChange} />
          Autorizo el uso de mis datos personales conforme a la Ley 19.628. <span style={{color:'#b91c1c',fontWeight:400}}>(opcional, agiliza el proceso)</span></label></li>
        <li><label><input type="checkbox" name="claveUnica" checked={checks.claveUnica} onChange={handleChange} />
          <b>Consiento la validación de mi identidad mediante ClaveÚnica. <span style={{color:'#b91c1c'}}>(obligatorio)</span></b></label></li>
        <li><label><input type="checkbox" name="scoring" checked={checks.scoring} onChange={handleChange} />
          Autorizo la consulta de mis datos financieros para cálculo de scoring crediticio. <span style={{color:'#b91c1c',fontWeight:400}}>(opcional)</span></label></li>
        <li><label><input type="checkbox" name="dicom" checked={checks.dicom} onChange={handleChange} />
          Permito la revisión de mi información en Boletín Comercial / DICOM. <span style={{color:'#b91c1c',fontWeight:400}}>(opcional)</span></label></li>
        <li><label><input type="checkbox" name="biometria" checked={checks.biometria} onChange={handleChange} />
          Acepto el uso de biometría facial para firma digital avanzada. <span style={{color:'#b91c1c',fontWeight:400}}>(opcional)</span></label></li>
      </ul>
      {error && <div style={{color:'#b91c1c',marginBottom:12}}>{error}</div>}
      <button type="submit" style={{width:'100%',background:'#3b82f6',color:'#fff',border:'none',borderRadius:6,padding:'0.8rem 0',fontWeight:700,fontSize:'1.1rem',cursor:'pointer'}}>Aceptar y Continuar</button>
    </form>
  );
}

export default ConsentimientoAvanzado;
