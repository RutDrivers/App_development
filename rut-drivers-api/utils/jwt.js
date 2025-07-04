// JWT helpers
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Genera un JWT para el payload dado.
 * @param {Object} payload - Datos a firmar en el token.
 * @returns {string} Token JWT.
 */
function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

/**
 * Verifica y decodifica un JWT.
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Payload decodificado.
 */
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
