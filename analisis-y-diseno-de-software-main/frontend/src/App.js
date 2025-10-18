import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import './App.css';

function App() {
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
    <div className="App">
      <Header />
      <main className="main-content">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
