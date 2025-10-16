import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo y nombre */}
          <div className="nav-logo">
            <a href="#inicio" className="logo-link">
              <div className="logo-container">
                <div className="logo-with-image">
                  <img src="/images/alara-logo.jpeg" alt="ALARA Logo" className="logo-image" />
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
          
          {/* Menú de navegación */}
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#inicio" className="nav-link">Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#simulador" className="nav-link">Simulador</a>
            </li>
            <li className="nav-item">
              <a href="#contacto" className="nav-link">Contacto</a>
            </li>
          </ul>
          
          {/* Botón CTA */}
          <div className="nav-cta">
            <button className="btn-primary">Simular Ahora</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;