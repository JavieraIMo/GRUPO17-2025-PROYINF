import React, { useState } from 'react';
import './Login.css';

function Login({ onClose, onSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Intentando autenticación con:', formData.email);
      
      const result = await authenticateUser(formData.email, formData.password);
      
      if (result.success) {
        console.log('Login exitoso:', result.user);
        // Llamar callback de éxito
        if (onSuccess) {
          // Guardar token si viene en la respuesta
          onSuccess({
            email: result.user.email,
            firstName: result.user.nombre_completo.split(' ')[0],
            lastName: result.user.nombre_completo.split(' ').slice(1).join(' '),
            id: result.user.id,
            rut: result.user.rut,
            token: result.user.token || result.token // token JWT si está disponible
          });
        }
      } else {
        setErrors({ general: result.error || 'Email o contraseña incorrectos' });
      }
      
    } catch (error) {
      console.error('Error en el login:', error);
      setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Autenticación con API real
  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3100/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        return { success: true, user: data.data.user };
      } else {
        return { success: false, error: data.error || 'Error desconocido' };
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <div className="login-header">
          <h2 className="login-title">Iniciar Sesión</h2>
          <button className="close-btn" onClick={onClose}>
            <span className="close-icon">×</span>
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="error-banner">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
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
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
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