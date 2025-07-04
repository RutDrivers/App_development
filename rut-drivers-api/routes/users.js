const express = require('express');
const router = express.Router();
const { success, error } = require('../utils/response');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const { createUser, findUserByEmail } = require('../models/users');
const validate = require('../utils/validate');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para usuarios
 */

// Registro de usuario
router.post('/register', validate(['email', 'password', 'user_type']), async (req, res, next) => {
  try {
    const { email, password, user_type } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) {
      return error(res, 'El usuario ya existe', 409);
    }
    const hashed = await hashPassword(password);
    const user = await createUser(email, hashed, user_type);
    success(res, { id: user.id, email: user.email, user_type: user.user_type });
  } catch (err) {
    next(err);
  }
});

// Login de usuario
router.post('/login', validate(['email', 'password']), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return error(res, 'Usuario o contraseña incorrectos', 401);
    }
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return error(res, 'Usuario o contraseña incorrectos', 401);
    }
    const token = generateToken({ id: user.id, email: user.email, user_type: user.user_type });
    success(res, { token });
  } catch (err) {
    next(err);
  }
});

// Buscar usuario por email (solo autenticados y admin)
router.get('/find', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await findUserByEmail(email);
    if (!user) {
      return error(res, 'Usuario no encontrado', 404);
    }
    success(res, { id: user.id, email: user.email, user_type: user.user_type });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
