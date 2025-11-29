import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./notificaciones.css";

function Notificaciones({ user }) {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // === NUEVO: Función para crear notificación de bienvenida ===
  const crearNotificacionBienvenida = async () => {
    try {
      await fetch(`http://localhost:3100/api/notificaciones/bienvenida/${user.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Notificación de bienvenida creada");
    } catch (error) {
      console.error("Error creando notificación de bienvenida:", error);
    }
  };

  // === NUEVO: Función para verificar si necesita bienvenida ===
  const necesitaBienvenida = (notificaciones) => {
    return notificaciones.length === 0;
  };

  // === MODIFICAR: Este useEffect existente ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`http://localhost:3100/api/notificaciones/${user.id}`);
        const data = await resp.json();
        
        // === NUEVA LÓGICA: Crear bienvenida si no hay notificaciones ===
        if (necesitaBienvenida(data)) {
          await crearNotificacionBienvenida();
          // Recargar notificaciones después de crear la bienvenida
          const respNuevo = await fetch(`http://localhost:3100/api/notificaciones/${user.id}`);
          const nuevasNotificaciones = await respNuevo.json();
          setNotificaciones(nuevasNotificaciones);
        } else {
          setNotificaciones(data);
        }
        
      } catch (err) {
        console.error("Error cargando notificaciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // === EL RESTO DE TU CÓDIGO PERMANECE IGUAL ===
  const marcarComoLeidas = async () => {
    await fetch(`http://localhost:3100/api/notificaciones/marcar_leidas/${user.id}`, {
      method: "PUT"
    });

    setNotificaciones(prev =>
      (Array.isArray(prev) ? prev : []).map(n => ({ ...n, leida: true }))
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

      {Array.isArray(notificaciones) && notificaciones.length === 0 ? (
        <p>No tienes notificaciones</p>
      ) : (
        <ul className="notif-list">
          {(Array.isArray(notificaciones) ? notificaciones : []).map((n) => (
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