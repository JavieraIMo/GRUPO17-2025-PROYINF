const express = require('express');
const router = express.Router();

const { 
  getUserNotifications,
  markAllAsRead,
  createWelcomeNotification,
  welcomeNotificationExists
} = require('../utils/notificationUtils');


// =============================================
// OBTENER NOTIFICACIONES DEL USUARIO
// =============================================
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const notificaciones = await getUserNotifications(userId);
    res.json(notificaciones);

  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al obtener notificaciones' 
    });
  }
});


// =============================================
// CREAR NOTIFICACIÓN DE BIENVENIDA
// =============================================
router.post('/bienvenida/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar si ya existe
    const yaExiste = await welcomeNotificationExists(userId);

    if (yaExiste) {
      return res.json({
        success: false,
        message: "La notificación de bienvenida ya existe"
      });
    }

    // Crear bienvenida
    await createWelcomeNotification(userId);

    res.json({
      success: true,
      message: "Notificación de bienvenida creada"
    });

  } catch (error) {
    console.error("Error creando notificación de bienvenida:", error);
    res.status(500).json({
      success: false,
      error: "Error al crear notificación de bienvenida"
    });
  }
});


// =============================================
// MARCAR TODAS COMO LEÍDAS
// =============================================
router.put('/marcar_leidas/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await markAllAsRead(userId);

    res.json({ 
      success: true, 
      message: 'Notificaciones marcadas como leídas' 
    });

  } catch (error) {
    console.error('Error marcando notificaciones como leídas:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al marcar notificaciones' 
    });
  }
});

module.exports = router;
