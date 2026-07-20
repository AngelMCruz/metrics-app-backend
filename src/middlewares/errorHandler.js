/**
 * Middleware de manejo centralizado de errores para Express.
 *
 * @param {Error} err - Objeto de error capturado.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - Función de paso al siguiente middleware.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.error(err.stack);

  const statusCode = err.statusCode || res.statusCode || 500;
  const statusMessage = err.message || 'Error interno del servidor';

  res.status(statusCode === 200 ? 500 : statusCode).json({
    error: statusMessage,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;