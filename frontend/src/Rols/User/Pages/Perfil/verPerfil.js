import React, { useEffect, useState } from "react";
import "./verPerfil.css";

const Perfil = ({ rutUsuario }) => {
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Simulación de carga de datos desde una API (reemplaza con tu endpoint real)
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const respuesta = await fetch(`/api/clientes/${rutUsuario}`);
        if (!respuesta.ok) throw new Error("Error al obtener datos");
        const data = await respuesta.json();
        setCliente(data);
      } catch (error) {
        console.error(error);
        setCliente(null);
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [rutUsuario]);

  if (cargando) return <div className="perfil-container"><p>Cargando datos...</p></div>;

  if (!cliente)
    return (
      <div className="perfil-container sin-datos">
        <p>No hay datos registrados</p>
      </div>
    );

  return (
    <div className="perfil-container">
      <h2>Perfil del Cliente</h2>

      <div className="perfil-datos">
        <div className="perfil-item">
          <span className="label">Nombre completo:</span>
          <span>{cliente.nombre_completo}</span>
        </div>

        <div className="perfil-item">
          <span className="label">RUT:</span>
          <span>{cliente.rut}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Fecha de nacimiento:</span>
          <span>{cliente.fecha_nacimiento || "—"}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Email:</span>
          <span>{cliente.email}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Teléfono:</span>
          <span>{cliente.telefono || "—"}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Región:</span>
          <span>{cliente.region || "—"}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Comuna:</span>
          <span>{cliente.comuna || "—"}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Dirección:</span>
          <span>{cliente.direccion || "—"}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Ingresos:</span>
          <span>
            {cliente.ingresos !== null ? `$${cliente.ingresos.toLocaleString()}` : "—"}
          </span>
        </div>

        <div className="perfil-item">
          <span className="label">Historial crediticio:</span>
          <span>{cliente.historial_crediticio || "—"}</span>
        </div>

        <div className="perfil-item">
          <span className="label">Fecha de registro:</span>
          <span>{new Date(cliente.fecha_registro).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
