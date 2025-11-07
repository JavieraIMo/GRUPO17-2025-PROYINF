
import LoanLogic from './pages/LoanLogic';
import BasicLoanLogic from './pages/BasicLoanLogic';
import LoanSimulator from './components/LoanSimulator/LoanSimulator';
import AdvancedLoanSimulator from './components/AdvancedLoanSimulator/AdvancedLoanSimulator';
import HistorialSimulaciones from './pages/HistorialSimulaciones';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.css';

function App() {
  // Manejar éxito de login/registro
  const handleAuthSuccess = (userData) => {
    // Forzar que el token se guarde correctamente
    let token = userData.token;
    // Si el token viene anidado, intenta extraerlo
    if (!token && userData.data && userData.data.token) {
      token = userData.data.token;
    }
    const userToSave = { ...userData, token };
    console.log('[ALARA] handleAuthSuccess userData:', userToSave);
    setUser(userToSave);
  };
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('alara_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      console.log('[ALARA] Guardando en localStorage:', user);
      localStorage.setItem('alara_user', JSON.stringify(user));
    } else {
      console.log('[ALARA] Eliminando alara_user de localStorage');
      localStorage.removeItem('alara_user');
    }
  }, [user]);

  useEffect(() => {
    // Actualizar el título y favicon dinámicamente
    document.title = 'ALARA Simulador - Simulador de Préstamos';
    
    // Crear favicon SVG directamente
    const faviconSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#111827" rx="4"/>
        <path d="M16 4 L26 28 L22 28 L20 22 L12 22 L10 28 L6 28 L16 4 Z M14 18 L18 18 L16 12 L14 18 Z" fill="white"/>
        <circle cx="16" cy="7" r="1.5" fill="#3b82f6"/>
      </svg>
    `)}`;
    
    // Remover favicons existentes
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(favicon => favicon.remove());
    
    // Agregar nuevo favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = faviconSvg;
    document.head.appendChild(link);
    
    // Fallback para ICO
    const linkIco = document.createElement('link');
    linkIco.rel = 'shortcut icon';
    linkIco.href = '/favicon.ico';
    document.head.appendChild(linkIco);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login onSuccess={handleAuthSuccess} />} />
            <Route path="/register" element={<Register onSuccess={handleAuthSuccess} />} />
            <Route path="/simulador" element={<LoanSimulator />} />
            <Route path="/simulador-avanzado" element={user ? <AdvancedLoanSimulator user={user} /> : <Login onSuccess={handleAuthSuccess} />} />
            <Route path="/logica-simulador" element={<LoanLogic />} />
            <Route path="/logica-simulador-basico" element={<BasicLoanLogic />} />
            <Route path="/historial" element={<HistorialSimulaciones user={user} />} />
            {/* Agrega más rutas si tienes más páginas */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
