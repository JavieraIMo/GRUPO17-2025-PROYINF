import React, { useState, useEffect } from "react";
import "./editarPerfil.css";
import { regionesComunasChile, regionesChile } from "./regionesComunasChile";

const EditarPerfil = ({ usuario, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || "",
    rut: usuario?.rut || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    region: usuario?.region || "",
    comuna: usuario?.comuna || "",
    direccion: usuario?.direccion || "",
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  useEffect(() => {
    if (formData.region) {
      const comunas = regionesComunasChile[formData.region];
      setComunasDisponibles(comunas || []);
    } else {
      setComunasDisponibles([]);
    }
  }, [formData.region]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGuardar = () => {
    onGuardar(formData);
  };

  return (
    <div className="editarPerfil-container">
      <h2>Editar Perfil</h2>

      <form className="perfil-form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} disabled />
        </div>

        <div className="form-group">
          <label>RUT</label>
          <input type="text" name="rut" value={formData.rut} disabled />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Región</label>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option value="">Seleccione una región</option>
            {regionesChile.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Comuna</label>
          <select
            name="comuna"
            value={formData.comuna}
            onChange={handleChange}
            disabled={!formData.region}
          >
            <option value="">
              {formData.region
                ? "Seleccione una comuna"
                : "Seleccione una región primero"}
            </option>
            {comunasDisponibles.map((comuna, index) => (
              <option key={index} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="btn-guardar" onClick={handleGuardar}>
            Guardar
          </button>
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfil;
