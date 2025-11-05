            <li className="nav-item">
              <Link to="/logica-simulador" className="nav-link">¿Cómo se calcula?</Link>
            </li>
import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Siempre inicia en false
  const [showRegister, setShowRegister] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    closeMenu();
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
    closeMenu();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('alara_user');
    closeMenu();
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo y nombre */}
          <div className="nav-logo">
            <a href="#inicio" className="logo-link">
              <div className="logo-container">
                <div className="logo-with-image">
                  <img src="/images/alara-logo.png" alt="ALARA Logo" className="logo-image" />
                  <div className="logo-text-container">
                    <div className="logo-text-styled">
                      ALARA
                    </div>
                    <div className="logo-subtitle">
                      SIMULADOR
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          
          {/* Menú de navegación desktop */}
          <ul className="nav-menu desktop-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/simulador" className="nav-link">Simulador</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link to="/simulador-avanzado" className="nav-link">Simulador Avanzado</Link>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <Link to="/historial" className="nav-link">Historial</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">Contacto</Link>
              </li>
            )}
          </ul>
          
          {/* Contenedor derecho: Botón CTA + Hamburger */}
          <div className="right-container">
            {!user ? (
              /* Usuario no logueado */
              <>
                <div className="nav-cta desktop-cta">
                  <button 
                    className="btn-iniciar-sesion"
                    onClick={() => setShowLogin(true)}
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <div className="nav-cta desktop-cta">
                  <button 
                    className="btn-registrarse"
                    onClick={() => setShowRegister(true)}
                  >
                    Registrarse
                  </button>
                </div>
              </>
            ) : (
              /* Usuario logueado */
              <>
                <div className="user-greeting desktop-cta">
                  <span className="user-name">Hola, {user.firstName}</span>
                </div>
                <div className="nav-cta desktop-cta">
                  <button className="btn-profile">
                    <span className="profile-icon">👤</span>
                    Perfil
                  </button>
                </div>
              </>
            )}

            {/* Botón hamburguesa */}
            <button className="hamburger-btn" onClick={toggleMenu}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Overlay para cerrar menú */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        {/* Menú lateral */}
        <div className={`side-menu ${isMenuOpen ? 'side-menu-open' : ''}`}>
          <div className="side-menu-header">
            <button className="close-btn" onClick={closeMenu}>
              <span className="close-icon">×</span>
            </button>
          </div>
          <ul className="side-menu-items">
            <li className="side-menu-item">
              <Link to="/" className="side-menu-link" onClick={closeMenu}>Inicio</Link>
            </li>
            <li className="side-menu-item">
              <Link to="/simulador" className="side-menu-link" onClick={closeMenu}>Simulador</Link>
            </li>
            <li className="side-menu-item">
              <Link to="/contacto" className="side-menu-link" onClick={closeMenu}>Contacto</Link>
            </li>
            
            {!user ? (
              /* Usuario no logueado */
              <>
                <li className="side-menu-item">
                  <button 
                    className="btn-iniciar-sesion side-menu-cta" 
                    onClick={() => { setShowLogin(true); closeMenu(); }}
                  >
                    Iniciar Sesión
                  </button>
                </li>
                <li className="side-menu-item">
                  <button 
                    className="btn-registrarse side-menu-cta" 
                    onClick={() => { setShowRegister(true); closeMenu(); }}
                  >
                    Registrarse
                  </button>
                </li>
              </>
            ) : (
              /* Usuario logueado */
              <>
                <li className="side-menu-item">
                  <div className="user-info">
                    <span className="user-welcome">Hola, {user.firstName}</span>
                  </div>
                </li>
                <li className="side-menu-item">
                  <button className="btn-profile side-menu-cta" onClick={closeMenu}>
                    <span className="profile-icon">👤</span>
                    Mi Perfil
                  </button>
                </li>
                <li className="side-menu-item">
                  <button className="btn-logout side-menu-cta" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Modales */}
        {showLogin && (
          <Login 
            onClose={() => setShowLogin(false)}
            onSuccess={handleLogin}
            onSwitchToRegister={switchToRegister}
          />
        )}
        
        {showRegister && (
          <Register 
            onClose={() => setShowRegister(false)}
            onSuccess={handleRegister}
          />
        )}
      </nav>
    </header>
  );
}

export default Header;