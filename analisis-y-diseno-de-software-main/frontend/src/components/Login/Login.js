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
      // Simular autenticación
      console.log('Datos del login:', formData);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular credenciales válidas
      const isValidUser = await authenticateUser(formData.email, formData.password);
      
      if (isValidUser) {
        // Llamar callback de éxito
        if (onSuccess) {
          onSuccess({
            email: formData.email,
            firstName: 'Usuario', // En producción vendría del backend
            lastName: 'Demo'
          });
        }
      } else {
        setErrors({ general: 'Email o contraseña incorrectos' });
      }
      
    } catch (error) {
      console.error('Error en el login:', error);
      setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Simular autenticación
  const authenticateUser = async (email, password) => {
    // Simulación - en producción sería una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular usuarios válidos
    const validUsers = [
      { email: 'demo@alara.cl', password: 'Demo123' },
      { email: 'test@example.com', password: 'Test123' }
    ];
    
    return validUsers.some(user => 
      user.email === email && user.password === password
    );
  };

  return (
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

          <div className="demo-credentials">
            <p className="demo-title">Credenciales de prueba:</p>
            <p className="demo-text">Email: demo@alara.cl</p>
            <p className="demo-text">Contraseña: Demo123</p>
          </div>
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