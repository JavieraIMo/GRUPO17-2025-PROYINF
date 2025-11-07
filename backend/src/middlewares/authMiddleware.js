const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[ALARA][AuthMiddleware] Token faltante o mal formado:', authHeader);
    return res.status(401).json({ ok: false, error: 'No autorizado: token faltante' });
  }
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    console.log('[ALARA][AuthMiddleware] Token inválido o expirado:', token);
    return res.status(401).json({ ok: false, error: 'Token inválido o expirado' });
  }
  req.user = payload;
  console.log('[ALARA][AuthMiddleware] Usuario autenticado:', payload);
  next();
}

module.exports = { authMiddleware };
