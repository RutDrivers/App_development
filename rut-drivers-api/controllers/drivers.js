// controllers/drivers.js
/**
 * Controlador para registrar un conductor.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function registerDriver(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return error(res, 'Faltan campos requeridos', 400);
    const existing = await findDriverByEmail(email);
    if (existing) return error(res, 'El conductor ya existe', 409);
    const hashed = await hashPassword(password);
    const driver = await createDriver({ name, email, password: hashed, status: 'available' });
    success(res, { id: driver.id, name: driver.name, email: driver.email, status: driver.status });
  } catch (err) {
    next(err);
  }
}

/**
 * Controlador para login de conductor.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function loginDriver(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, 'Faltan campos requeridos', 400);
    const driver = await findDriverByEmail(email);
    if (!driver) return error(res, 'Email o contraseña incorrectos', 401);
    const valid = await comparePassword(password, driver.password);
    if (!valid) return error(res, 'Email o contraseña incorrectos', 401);
    const token = generateToken({ id: driver.id, email: driver.email, role: 'driver' });
    success(res, { token });
  } catch (err) {
    next(err);
  }
}

/**
 * Controlador para obtener perfil de conductor.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function getDriverProfile(req, res, next) {
  try {
    const { id } = req.params;
    const driver = await findDriverById(id);
    if (!driver) return error(res, 'Conductor no encontrado', 404);
    success(res, { id: driver.id, name: driver.name, email: driver.email, status: driver.status });
  } catch (err) {
    next(err);
  }
}

/**
 * Controlador para actualizar estado de conductor.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function setDriverStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return error(res, 'Falta el estado', 400);
    const driver = await updateDriverStatus(id, status);
    if (!driver) return error(res, 'Conductor no encontrado', 404);
    success(res, { id: driver.id, status: driver.status });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerDriver, loginDriver, getDriverProfile, setDriverStatus };
