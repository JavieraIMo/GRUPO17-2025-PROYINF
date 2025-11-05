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
import LoanSimulator from '../components/LoanSimulator/LoanSimulator';
import AdvancedLoanSimulator from '../components/AdvancedLoanSimulator/AdvancedLoanSimulator';

function Home({ user }) {
  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a Alara Simulador</h1>
        <p>Calcula tus préstamos de consumo de manera fácil y rápida.</p>
        <button className="btn-comenzar">Comenzar</button>
      </section>
      <section>
        {user ? <AdvancedLoanSimulator user={user} /> : <LoanSimulator />}
      </section>
    </div>
  );
}

export default Home;