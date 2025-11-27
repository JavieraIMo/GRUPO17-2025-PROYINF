import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import ConsentimientoScoring from '../ConsentimientoScoring';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [showConsent, setShowConsent] = useState(false);

  const handleConsent = () => {
    setShowConsent(false);
    navigate('/postulacion');
  };

  return (
    <div className="dashboard-container">
      <h1>¡Bienvenido, {user?.nombre || user?.firstName || 'Usuario'}!</h1>
      <div className="dashboard-actions">
        <button onClick={() => navigate('/seleccionar-tipo-prestamo')}>Simular Préstamo</button>
        <button onClick={() => navigate('/historial')}>Ver Historial</button>
        <button onClick={() => setShowConsent(true)}>Postular a Préstamo</button>
        <button onClick={() => navigate('/perfil')}>Editar Perfil</button>
      </div>
      <div className="dashboard-summary">
        <h2>Resumen</h2>
        <ul>
          <li>Última simulación: {/* Aquí puedes mostrar info de la última simulación */}</li>
          <li>Estado de postulación: {/* Estado si ya postuló */}</li>
        </ul>
      </div>
      {showConsent && (
        <div className="modal-overlay" onClick={() => setShowConsent(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ConsentimientoScoring onConsent={handleConsent} />
            <button className="close-btn" onClick={() => setShowConsent(false)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
