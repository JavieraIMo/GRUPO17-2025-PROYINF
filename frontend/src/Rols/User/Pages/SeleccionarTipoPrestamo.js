import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SeleccionarTipoPrestamo.css';

const tiposPrestamo = [
  {
    tipo: 'Consumo',
    descripcion: 'Préstamo para libre disposición, compras, viajes, imprevistos, etc. Rápido y flexible.',
    imagen: '/images/prestamo-consumo.png'
  },
  {
    tipo: 'Automotriz',
    descripcion: 'Financia la compra de tu auto nuevo o usado. Tasas preferenciales y plazos extendidos.',
    imagen: '/images/prestamo-auto.png'
  },
  {
    tipo: 'Hipotecario',
    descripcion: 'Compra tu casa o departamento. Plazos largos y montos altos, sujeto a evaluación.',
    imagen: '/images/prestamo-casa.png'
  }
];

function SeleccionarTipoPrestamo() {
  const navigate = useNavigate();

  const handleSelect = (tipo) => {
    navigate(`/simulador_basico?tipo=${encodeURIComponent(tipo)}`);
  };

  return (
    <div className="tipo-prestamo-container">
      <h1>Selecciona el tipo de préstamo</h1>
      <div className="tipos-lista">
        {tiposPrestamo.map(({ tipo, descripcion, imagen }) => (
          <div key={tipo} className="tipo-card">
            <img src={imagen} alt={tipo} className="tipo-img" />
            <h2>{tipo}</h2>
            <p>{descripcion}</p>
            <button onClick={() => handleSelect(tipo)}>Simular {tipo}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeleccionarTipoPrestamo;
