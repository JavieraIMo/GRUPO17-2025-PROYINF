import React, { useState } from 'react';
import './Login.css';

function Login({ onClose, onSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="login-modal">
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
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Tu contraseña"
            />
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
  );
}

export default Login;