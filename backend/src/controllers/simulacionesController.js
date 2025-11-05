// Obtener historial de simulaciones del usuario autenticado
exports.obtenerHistorialSimulaciones = async (req, res) => {
  try {
    const cliente_id = req.user.id;
    const result = await db.query(
      `SELECT id, monto_simulado, plazo_simulado, tasa_aplicada, cuota_calculada, tipo_prestamo, moneda_id, datos_adicionales, created_at
       FROM simulaciones WHERE cliente_id = $1 ORDER BY created_at DESC`,
      [cliente_id]
    );
    res.json({ ok: true, simulaciones: result.rows });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ ok: false, error: 'Error al obtener historial de simulaciones' });
  }
};
const db = require('../../db');

// Guarda una simulación avanzada en la base de datos
exports.guardarSimulacion = async (req, res) => {
  try {
    const { tipo, monto, plazo, tasa, cuota, tabla } = req.body;
    const cliente_id = req.user.id;
    // Guardar solo los primeros 12 meses de la tabla
    const tabla12 = Array.isArray(tabla) ? tabla.slice(0, 12) : [];
    await db.query(
      `INSERT INTO simulaciones (cliente_id, monto_simulado, plazo_simulado, tasa_aplicada, cuota_calculada, tipo_prestamo, moneda_id, datos_adicionales)
       VALUES ($1, $2, $3, $4, $5, $6, 1, $7)`,
      [cliente_id, monto, plazo, tasa, cuota, tipo, JSON.stringify(tabla12)]
    );
    res.status(201).json({ ok: true, mensaje: 'Simulación guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar simulación:', error);
    res.status(500).json({ ok: false, error: 'Error al guardar simulación' });
  }
};
