const express = require('express');
const router = express.Router();
const db = require('../db');
const { success, error } = require('../utils/response');

router.post('/register', async (req, res) => {
  try {
    const { email, password, user_type } = req.body;
    const result = await db.query(
      'INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3) RETURNING *',
      [email, password, user_type]
    );
    success(res, result.rows[0]);
  } catch (err) {
    console.error(err);
    error(res, 'Error al registrar usuario');
  }
});

router.get('/find', async (req, res) => {
  try {
    const { email } = req.query;
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return error(res, 'Usuario no encontrado', 404);
    }
    success(res, result.rows[0]);
  } catch (err) {
    console.error(err);
    error(res, 'Error al buscar usuario');
  }
});

module.exports = router;
