import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./notificaciones.css";

function Notificaciones({ user }) {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada al backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`http://localhost:4000/api/notificaciones/${user.id}`);
        const data = await resp.json();
        setNotificaciones(data);
      } catch (err) {
        console.error("Error cargando notificaciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const marcarComoLeidas = async () => {
    await fetch(`http://localhost:4000/api/notificaciones/marcar_leidas/${user.id}`, {
      method: "PUT"
    });

    setNotificaciones(prev =>
      prev.map(n => ({ ...n, leida: true }))
    );
  };

  if (loading) return <p>Cargando notificaciones...</p>;

  return (
    <div className="notif-container">
      <button className="btn-close" onClick={() => navigate('/')} aria-label="Volver al inicio">×</button>
      <h2>Notificaciones</h2>

      <button className="btn-leer" onClick={marcarComoLeidas}>
        Marcar todas como leídas
      </button>

      {notificaciones.length === 0 ? (
        <p>No tienes notificaciones</p>
      ) : (
        <ul className="notif-list">
          {notificaciones.map((n) => (
            <li key={n.id} className={`notif-item ${n.leida ? "leida" : "no-leida"}`}>
              <h4>{n.titulo}</h4>
              <p>{n.mensaje}</p>
              <span className="fecha">{new Date(n.fecha).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notificaciones;
