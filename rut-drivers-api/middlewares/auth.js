// middlewares/auth.js
const { verifyToken } = require('../utils/jwt');

/**
 * Middleware para autenticar usuarios usando JWT.
 * Agrega el usuario decodificado a req.user si el token es válido.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'Token requerido' });
  const token = authHeader.split(' ')[1];
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
}

/**
 * Middleware para autorizar acceso según roles permitidos.
 * @param {string[]} roles - Lista de roles permitidos.
 * @returns {function} Middleware de Express.
 */
function authorize(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_type) && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
