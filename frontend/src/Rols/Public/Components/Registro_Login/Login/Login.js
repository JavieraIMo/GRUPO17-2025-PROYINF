import React, { useState } from 'react';
import './Login.css';

function Login({ onClose, onSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    console.log('[ALARA][Login] Enviando datos a API:', formData);
    try {
      const result = await authenticateUser(formData.email, formData.password);
      console.log('[ALARA][Login] Respuesta completa:', result);
      if (result.success && result.data) {
        if (onSuccess) {
          // Log para ver la estructura
          console.log('[ALARA][Login] Antes de llamar a onSuccess:', {
            ...result.data.user,
            token: result.data.token
          });
          onSuccess({
            ...result.data.user,
            nombre: result.data.user.nombre || result.data.user.nombre_completo || result.data.user.name || '',
            token: result.data.token
          });
          console.log('[ALARA][Login] Después de llamar a onSuccess');
        }
      } else {
        setErrors({ general: result.error || 'Email o contraseña incorrectos' });
      }
    } catch (error) {
      setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' });
      console.error('[ALARA][Login] Error en llamada a API:', error);
    } finally {
      setIsLoading(false);
      console.log('[ALARA][Login] handleSubmit finalizado');
    }
  };

  const authenticateUser = async (email, password) => {
    console.log('[ALARA][Login] Llamando a /api/auth/login con:', { email, password });
    try {
      const response = await fetch('http://localhost:3100/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log('[ALARA][Login] Respuesta fetch:', data);
      if (response.ok && data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error || 'Error desconocido' };
      }
    } catch (error) {
      console.error('[ALARA][Login] Error en fetch:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <div className="login-container">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h2 className="login-title">Iniciar Sesión</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group" style={{position: 'relative'}}>
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Tu contraseña"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                style={{position: 'absolute', right: '1rem', top: '2.2rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
              >
                {showPassword ? (
                  // SVG ojo abierto
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11C3.5 7 7 4 11 4C15 4 18.5 7 20 11" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 11C3.5 15 7 18 11 18C15 18 18.5 15 20 11" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="11" cy="11" r="3" stroke="#374151" strokeWidth="2"/>
                  </svg>
                ) : (
                  // SVG ojo cerrado
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11C3.5 7 7 4 11 4C15 4 18.5 7 20 11" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 11C3.5 15 7 18 11 18C15 18 18.5 15 20 11" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11C7 13.2091 8.79086 15 11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="4" y1="18" x2="18" y2="4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-options">
              <label className="remember-label">
                <input type="checkbox" className="remember-checkbox" />
                <span className="remember-text">Recordarme</span>
              </label>
              <a href="#forgot" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
          <div className="login-footer">
            <p className="register-prompt">
              ¿No tienes cuenta?{' '}
              <button onClick={onSwitchToRegister} className="register-link">
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;