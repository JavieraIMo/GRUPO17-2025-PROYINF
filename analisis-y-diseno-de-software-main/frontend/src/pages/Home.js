import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a Alara Simulador</h1>
        <p>Calcula tus préstamos de consumo de manera fácil y rápida.</p>
        <button className="btn-comenzar">Comenzar</button>
      </section>
    </div>
  );
}

export default Home;