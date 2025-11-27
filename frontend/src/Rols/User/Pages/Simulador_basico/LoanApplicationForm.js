import React, { useState } from 'react';

function LoanApplicationForm({ simulation, user, onSubmit }) {
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    rut: user?.rut || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    cuenta: '',
    banco: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = 'Nombre requerido';
    if (!form.rut) newErrors.rut = 'RUT requerido';
    if (!form.email) newErrors.email = 'Email requerido';
    if (!form.cuenta) newErrors.cuenta = 'Cuenta bancaria requerida';
    if (!form.banco) newErrors.banco = 'Banco requerido';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      await onSubmit({ ...form, simulation });
      setSuccess(true);
    } catch (err) {
      setErrors({ general: 'Error al enviar solicitud' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <div className="success-message">¡Solicitud enviada con éxito!</div>;
  }

  return (
    <form className="loan-application-form" onSubmit={handleSubmit}>
      <h2>Postulación a Préstamo</h2>
      {errors.general && <div className="error-message">{errors.general}</div>}
      <div className="form-group">
        <label>Nombre completo</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errors.nombre && <span className="error-message">{errors.nombre}</span>}
      </div>
      <div className="form-group">
        <label>RUT</label>
        <input name="rut" value={form.rut} onChange={handleChange} />
        {errors.rut && <span className="error-message">{errors.rut}</span>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Cuenta bancaria</label>
        <input name="cuenta" value={form.cuenta} onChange={handleChange} />
        {errors.cuenta && <span className="error-message">{errors.cuenta}</span>}
      </div>
      <div className="form-group">
        <label>Banco</label>
        <input name="banco" value={form.banco} onChange={handleChange} />
        {errors.banco && <span className="error-message">{errors.banco}</span>}
      </div>
      <div className="form-group">
        <label>Datos del préstamo simulado</label>
        <div className="sim-data">
          <div>Monto: <b>{simulation?.monto ? `$${simulation.monto}` : '-'}</b></div>
          <div>Plazo: <b>{simulation?.plazo ? `${simulation.plazo} meses` : '-'}</b></div>
          <div>Cuota: <b>{simulation?.cuota ? `$${simulation.cuota}` : '-'}</b></div>
        </div>
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar Solicitud'}</button>
    </form>
  );
}

export default LoanApplicationForm;
