const db = require('../db');

// Crear nuevo usuario
async function createUser(email, password, user_type) {
  const result = await db.query(
    'INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3) RETURNING *',
    [email, password, user_type]
  );
  return result.rows[0];
}

// Buscar usuario por email
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
