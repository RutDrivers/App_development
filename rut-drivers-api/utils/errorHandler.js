/**
 * Middleware centralizado para manejo de errores en Express.
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
// Centralized error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
