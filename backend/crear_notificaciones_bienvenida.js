// Script para crear notificaciones de bienvenida a todos los usuarios activos que no la tengan
const { createWelcomeNotification, welcomeNotificationExists } = require('./src/utils/notificationUtils');
const User = require('./src/models/User');

(async () => {
  try {
    const users = await User.getAllActive();
    let count = 0;
    for (const user of users) {
      const exists = await welcomeNotificationExists(user.id);
      if (!exists) {
        await createWelcomeNotification(user.id);
        count++;
      }
    }
    console.log(`Listo. Se crearon ${count} notificaciones de bienvenida nuevas.`);
    process.exit(0);
  } catch (err) {
    console.error('Error creando notificaciones de bienvenida:', err);
    process.exit(1);
  }
})();
