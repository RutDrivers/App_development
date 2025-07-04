// Password helpers
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña usando bcrypt.
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<string>} Hash de la contraseña.
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña con su hash.
 * @param {string} password - Contraseña en texto plano.
 * @param {string} hash - Hash de la contraseña.
 * @returns {Promise<boolean>} true si coinciden, false si no.
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };
