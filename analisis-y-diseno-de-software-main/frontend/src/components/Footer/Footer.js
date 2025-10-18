import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo y descripción */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <h3 className="footer-logo-text">ALARA</h3>
            <span className="footer-logo-subtitle">SIMULADOR</span>
          </div>
          <p className="footer-description">
            Plataforma confiable para la simulación y cálculo de préstamos. 
            Toma decisiones financieras informadas con ALARA.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-section">
          <h4 className="footer-title">Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><a href="/" className="footer-link">Inicio</a></li>
            <li><a href="/simulador" className="footer-link">Simulador</a></li>
            <li><a href="/contacto" className="footer-link">Contacto</a></li>
            <li><a href="/ayuda" className="footer-link">Ayuda</a></li>
          </ul>
        </div>

        {/* Productos */}
        <div className="footer-section">
          <h4 className="footer-title">Productos</h4>
          <ul className="footer-links">
            <li><a href="/prestamos-personales" className="footer-link">Préstamos Personales</a></li>
            <li><a href="/prestamos-hipotecarios" className="footer-link">Préstamos Hipotecarios</a></li>
            <li><a href="/simulaciones" className="footer-link">Simulaciones</a></li>
            <li><a href="/calculadoras" className="footer-link">Calculadoras</a></li>
          </ul>
        </div>

        {/* Soporte */}
        <div className="footer-section">
          <h4 className="footer-title">Soporte</h4>
          <ul className="footer-links">
            <li><a href="/centro-ayuda" className="footer-link">Centro de Ayuda</a></li>
            <li><a href="/preguntas-frecuentes" className="footer-link">Preguntas Frecuentes</a></li>
            <li><a href="/politicas" className="footer-link">Políticas</a></li>
            <li><a href="/terminos" className="footer-link">Términos de Uso</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h4 className="footer-title">Contacto</h4>
          <div className="footer-contact">
            <p className="footer-contact-item">
              <span className="contact-icon">📧</span>
              contacto@alara.cl
            </p>
            <p className="footer-contact-item">
              <span className="contact-icon">📞</span>
              +56 2 2345 6789
            </p>
            <p className="footer-contact-item">
              <span className="contact-icon">📍</span>
              Santiago, Chile
            </p>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © 2025 ALARA Simulador. Todos los derechos reservados.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;