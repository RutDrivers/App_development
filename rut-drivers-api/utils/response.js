// utils/response.js
/**
 * Envía una respuesta exitosa con datos.
 * @param {Response} res
 * @param {any} data
 * @returns {Response}
 */
function success(res, data) {
    return res.status(200).json({ success: true, data });
  }
  
  /**
 * Envía una respuesta de error con mensaje y código.
 * @param {Response} res
 * @param {string} message
 * @param {number} [code=500]
 * @returns {Response}
 */
function error(res, message, code = 500) {
    return res.status(code).json({ success: false, message });
  }

  module.exports = { success, error };
