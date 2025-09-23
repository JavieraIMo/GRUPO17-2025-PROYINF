import React, { useState } from 'react';

// Importar componentes
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Simulator from './components/Simulator/Simulator';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import LoginModal from './components/Login/LoginModal';

// Importar estilos
import './styles/global.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (loginData) => {
    // Simulación de autenticación exitosa
    const userData = { 
      name: loginData.email.split('@')[0], 
      email: loginData.email 
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setSuccess('¡Inicio de sesión exitoso!');
    
    // Limpiar mensaje de éxito después de 3 segundos
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSuccess('Sesión cerrada exitosamente');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setError('');
  };

  return (
    <div className="banking-app">
      {/* Header */}
      <Header 
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />

      {/* Mensajes de estado */}
      {error && (
        <div className="message error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="message success-message">
          {success}
        </div>
      )}

      {/* Modal de Login */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        error={error}
        setError={setError}
      />

      {/* Contenido Principal */}
      <main className="main-content">
        {/* Sección Hero */}
        <Hero 
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginClick}
        />

        {/* Sección Simulador */}
        <Simulator 
          isLoggedIn={isLoggedIn}
          user={user}
          onLoginClick={handleLoginClick}
        />

        {/* Sección Features */}
        <Features />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;