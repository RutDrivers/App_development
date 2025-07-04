// utils/validate.js
/**
 * Middleware para validar que los campos requeridos estén presentes en req.body.
 * @param {string[]} fields - Lista de campos requeridos.
 * @returns {function} Middleware de Express.
 * @example
 * router.post('/register', validate(['email', 'password']), handler)
 */
function validate(fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `Falta el campo: ${field}` });
      }
    }
    next();
  };
}

module.exports = validate;
