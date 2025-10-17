import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          
          {/* Menú de navegación desktop */}
          <ul className="nav-menu desktop-menu">
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
          
          {/* Contenedor derecho: Botón CTA + Hamburger */}
          <div className="right-container">
            <div className="nav-cta desktop-cta">
              <button className="btn-primary">Simular Ahora</button>
            </div>

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
              <a href="#inicio" className="side-menu-link" onClick={closeMenu}>Inicio</a>
            </li>
            <li className="side-menu-item">
              <a href="#simulador" className="side-menu-link" onClick={closeMenu}>Simulador</a>
            </li>
            <li className="side-menu-item">
              <a href="#contacto" className="side-menu-link" onClick={closeMenu}>Contacto</a>
            </li>
            <li className="side-menu-item">
              <button className="btn-primary side-menu-cta" onClick={closeMenu}>Simular Ahora</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;