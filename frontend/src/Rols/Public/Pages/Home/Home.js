// Ejemplos de comentarios (breve guía):
// JavaScript (fuera de JSX):
//   // comentario de una línea
//   /* comentario
//      multilínea */
// JSX (dentro del return/JSX):
//   {/* comentario en JSX */}
// CSS:
//   /* comentario CSS */
// HTML:
//   <!-- comentario HTML -->
// SQL:
//   -- comentario SQL
//   /* comentario SQL multilínea */

import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import LoanSimulator from '../Simulador_Basico/LoanSimulator';

function Home({ user }) {
  const navigate = useNavigate();
  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a Alara Simulador</h1>
        <p>Calcula tus préstamos de consumo de manera fácil y rápida.</p>
        <button className="btn-comenzar" onClick={() => navigate('/simulador')}>Comenzar</button>
      </section>
      {/* Solo mostrar el simulador básico público en Home */}
    </div>
  );
}

export default Home;