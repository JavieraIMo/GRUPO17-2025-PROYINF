import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import ConsentimientoScoring from '../ConsentimientoScoring';


function Dashboard({ user }) {
  const navigate = useNavigate();
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(() => {
    // Persistir consentimiento en sessionStorage para la sesión actual
    return sessionStorage.getItem('alara_consentimiento_scoring') === 'true';
  });

  const handleConsent = () => {
    setShowConsent(false);
    setConsentGiven(true);
    sessionStorage.setItem('alara_consentimiento_scoring', 'true');
    navigate('/postulacion');
  };

  return (
    <div className="dashboard-container">
      <h1>¡Bienvenid@, {(() => {
        const nombre = user?.nombre || user?.firstName || 'Usuario';
        return nombre.split(' ')[0];
      })()}!</h1>
      <div className="dashboard-actions">
        {/* <button onClick={() => navigate('/seleccionar-tipo-prestamo')}>Simular Préstamo Básico</button> */}
        <button onClick={() => navigate('/simulador-avanzado')}>Simulación Avanzada + Scoring</button>
        <button onClick={() => navigate('/historial')}>Ver Historial</button>
        <button
          onClick={() => {
            if (consentGiven) {
              navigate('/postulacion');
            } else {
              setShowConsent(true);
            }
          }}
        >
          Postular a Préstamo
        </button>
        <button onClick={() => navigate('/editar-perfil')}>Editar Perfil</button>
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
