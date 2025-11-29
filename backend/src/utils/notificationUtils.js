// =====================================================
// UTILIDADES PARA NOTIFICACIONES
// =====================================================

const pool = require('../../db');

/**
 * Crea una notificación de bienvenida para un usuario
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Objeto con la notificación creada
 */
const createWelcomeNotification = async (userId) => {
  try {
    const notificacionBienvenida = {
      usuario_id: userId,
      titulo: "🎉 ¡Bienvenido a ALARA!",
      mensaje: "Gracias por confiar en nosotros. Explora todas las funciones disponibles: simulaciones de préstamos, cálculo de cuotas, historial de transacciones y más. Estamos aquí para ayudarte en tu experiencia financiera.",
      tipo: "bienvenida"
    };

    const result = await pool.query(
      'INSERT INTO notificaciones (usuario_id, titulo, mensaje, tipo) VALUES ($1, $2, $3, $4) RETURNING *',
      [notificacionBienvenida.usuario_id, notificacionBienvenida.titulo, notificacionBienvenida.mensaje, notificacionBienvenida.tipo]
    );

    console.log(`✅ Notificación de bienvenida creada para usuario ${userId}`);
    return result.rows[0];

  } catch (error) {
    console.error("❌ Error creando notificación de bienvenida:", error);
    // No lanzar error, solo registrar para que el flujo de registro/login continúe
    return null;
  }
};

/**
 * Verifica si un usuario ya tiene notificación de bienvenida
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>} true si ya existe, false si no
 */
const welcomeNotificationExists = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT id FROM notificaciones WHERE usuario_id = $1 AND tipo = $2',
      [userId, 'bienvenida']
    );

    return result.rows.length > 0;

  } catch (error) {
    console.error("Error verificando notificación de bienvenida:", error);
    return false;
  }
};

/**
 * Obtiene todas las notificaciones de un usuario
 * @param {number} userId - ID del usuario
 * @returns {Promise<Array>} Array de notificaciones
 */
const getUserNotifications = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notificaciones WHERE usuario_id = $1 ORDER BY fecha DESC',
      [userId]
    );

    return result.rows;

  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    return [];
  }
};

/**
 * Marca una notificación como leída
 * @param {number} notificationId - ID de la notificación
 * @returns {Promise<void>}
 */
const markAsRead = async (notificationId) => {
  try {
    await pool.query(
      'UPDATE notificaciones SET leida = true WHERE id = $1',
      [notificationId]
    );

    console.log(`✅ Notificación ${notificationId} marcada como leída`);

  } catch (error) {
    console.error("Error marcando notificación como leída:", error);
  }
};

/**
 * Marca todas las notificaciones de un usuario como leídas
 * @param {number} userId - ID del usuario
 * @returns {Promise<void>}
 */
const markAllAsRead = async (userId) => {
  try {
    await pool.query(
      'UPDATE notificaciones SET leida = true WHERE usuario_id = $1',
      [userId]
    );

    console.log(`✅ Todas las notificaciones del usuario ${userId} marcadas como leídas`);

  } catch (error) {
    console.error("Error marcando notificaciones como leídas:", error);
  }
};

module.exports = {
  createWelcomeNotification,
  welcomeNotificationExists,
  getUserNotifications,
  markAsRead,
  markAllAsRead
};
