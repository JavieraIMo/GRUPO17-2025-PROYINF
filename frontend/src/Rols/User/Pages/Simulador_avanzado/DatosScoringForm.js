import React, { useState } from 'react';

/**
 * Formulario para capturar los datos necesarios para el scoring crediticio.
 * Llama a onSubmit(datos) cuando el usuario envía el formulario.
 */
function DatosScoringForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    enDICOM: false,
    deudorPension: false,
    ingresos: '',
    historial: 'bueno',
    antiguedad: '',
    ratioEndeudamiento: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Validación básica
    if (
      form.ingresos === '' ||
      form.antiguedad === '' ||
      form.ratioEndeudamiento === ''
    ) {
      setError('Completa todos los campos numéricos.');
      return;
    }
    setError('');
    onSubmit({
      dicom: form.enDICOM,
      pensionAlimenticia: form.deudorPension,
      ingresos: Number(form.ingresos),
      historial: form.historial,
      antiguedad: Number(form.antiguedad),
      endeudamiento: form.ratioEndeudamiento !== '' ? Number(form.ratioEndeudamiento) : 0
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:400,margin:'0 auto',padding:'1.5rem',background:'#fff',borderRadius:12,boxShadow:'0 2px 12px #0001'}}>
      <h3 style={{marginBottom:16}}>Datos para Scoring Crediticio</h3>
      <label style={{display:'block',marginBottom:8}}>
        <input type="checkbox" name="enDICOM" checked={form.enDICOM} onChange={handleChange} />
        ¿Estás en DICOM?
      </label>
      <label style={{display:'block',marginBottom:8}}>
        <input type="checkbox" name="deudorPension" checked={form.deudorPension} onChange={handleChange} />
        ¿Eres deudor de pensión alimenticia?
      </label>
      <label style={{display:'block',marginBottom:8}}>
        Ingresos mensuales (CLP):
        <input type="number" name="ingresos" value={form.ingresos} onChange={handleChange} min={0} step={1000} style={{width:'100%',padding:6,marginTop:2}} />
      </label>
      <label style={{display:'block',marginBottom:8}}>
        Historial crediticio (últimos 24 meses):
        <select name="historial" value={form.historial} onChange={handleChange} style={{width:'100%',padding:6,marginTop:2}}>
          <option value="bueno">Sin morosidades / buen comportamiento</option>
          <option value="leve">1–2 atrasos menores a 30 días</option>
          <option value="atraso">Atrasos &gt; 30 días pero sin deudas impagas</option>
          <option value="malo">Mal historial (moroso frecuente)</option>
        </select>
      </label>
      <label style={{display:'block',marginBottom:8}}>
        Antigüedad laboral (años):
        <input type="number" name="antiguedad" value={form.antiguedad} onChange={handleChange} min={0} max={50} step={1} style={{width:'100%',padding:6,marginTop:2}} />
      </label>
      <label style={{display:'block',marginBottom:8}}>
        Nivel de endeudamiento (% deuda/ingreso):
        <input type="number" name="ratioEndeudamiento" value={form.ratioEndeudamiento} onChange={handleChange} min={0} max={100} step={1} style={{width:'100%',padding:6,marginTop:2}} />
      </label>
      {error && <div style={{color:'#b91c1c',marginBottom:8}}>{error}</div>}
      <button type="submit" disabled={loading} style={{width:'100%',background:'#3b82f6',color:'#fff',border:'none',borderRadius:6,padding:'0.7rem 0',fontWeight:700,fontSize:'1.08rem',cursor:'pointer',marginTop:8}}>
        {loading ? 'Calculando...' : 'Calcular Scoring'}
      </button>
    </form>
  );
}

export default DatosScoringForm;
