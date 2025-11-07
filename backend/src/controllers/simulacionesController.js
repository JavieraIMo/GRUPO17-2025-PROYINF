// Obtener historial de simulaciones del usuario autenticado
exports.obtenerHistorialSimulaciones = async (req, res) => {
  try {
    const cliente_id = req.user.id;
    console.log('[ALARA][Backend] Consultando historial para cliente_id:', cliente_id);
    const result = await db.query(
      `SELECT id, monto_simulado, plazo_simulado, tasa_aplicada, cuota_calculada, tipo_prestamo, moneda_id, datos_adicionales, fecha_simulacion
       FROM simulaciones WHERE cliente_id = $1 ORDER BY fecha_simulacion DESC`,
      [cliente_id]
    );
    console.log('[ALARA][Backend] Simulaciones encontradas:', result.rows.length);
    res.json({ ok: true, simulaciones: result.rows || [] });
  } catch (error) {
    console.error('[ALARA][Backend] Error al obtener historial:', error);
    // Si el error es por tabla vacía o usuario sin simulaciones, devolver array vacío
    res.json({ ok: true, simulaciones: [] });
  }
};
const db = require('../../db');

// Guarda una simulación avanzada en la base de datos
exports.guardarSimulacion = async (req, res) => {
  try {
    console.log('[ALARA][Backend] Recibido POST /api/simulaciones:', req.body);
    const { tipo, monto, plazo, tasa, cuota, tabla } = req.body;
    const cliente_id = req.user ? req.user.id : null;
    console.log('[ALARA][Backend] Usuario autenticado:', cliente_id);
    const tabla12 = Array.isArray(tabla) ? tabla.slice(0, 12) : [];
    // Reemplazar simulación si ya existe una igual para este usuario
    // Solo comparar tipo, monto, plazo y tasa para evitar duplicados
    await db.query(
      `DELETE FROM simulaciones WHERE cliente_id = $1 AND tipo_prestamo = $2 AND monto_simulado = $3 AND plazo_simulado = $4 AND tasa_aplicada = $5`,
      [cliente_id, tipo, monto, plazo, tasa]
    );
    await db.query(
      `INSERT INTO simulaciones (cliente_id, monto_simulado, plazo_simulado, tasa_aplicada, cuota_calculada, tipo_prestamo, moneda_id, datos_adicionales)
       VALUES ($1, $2, $3, $4, $5, $6, 1, $7)`,
      [cliente_id, monto, plazo, tasa, cuota, tipo, JSON.stringify(tabla12)]
    );
    res.status(201).json({ ok: true, mensaje: 'Simulación guardada correctamente' });
  } catch (error) {
    console.error('[ALARA][Backend] Error al guardar simulación:', error);
    res.status(500).json({ ok: false, error: 'Error al guardar simulación' });
  }
};
