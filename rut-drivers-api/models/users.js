const db = require('../db');

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {string} email
 * @param {string} password
 * @param {string} user_type
 * @returns {Promise<Object>} Usuario creado
 */
async function createUser(email, password, user_type) {
  const result = await db.query(
    'INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3) RETURNING *',
    [email, password, user_type]
  );
  return result.rows[0];
}

/**
 * Busca un usuario por email.
 * @param {string} email
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
async function findUserByEmail(email) {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
