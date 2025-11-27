import React from 'react';
import './Configuracion.css';

function Configuracion() {
  return (
    <div className="config-container">
      <h1>Configuración de Usuario</h1>
      <section className="config-section">
        <h2>Información Bancaria</h2>
        <p>Aquí podrás configurar tu cuenta bancaria para recibir préstamos. Si no la ingresas, el sistema intentará buscarla automáticamente si es posible.</p>
        {/* Aquí iría el formulario de cuenta bancaria */}
      </section>
      <section className="config-section">
        <h2>Otros Datos Personales</h2>
        <p>Actualiza tu dirección, teléfono y otros datos relevantes.</p>
        {/* Aquí iría el formulario de otros datos personales */}
      </section>
    </div>
  );
}

export default Configuracion;
