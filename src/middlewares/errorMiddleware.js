const errorMiddleware = (err, _req, res, _next) => {
  if (err.status && err.message) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Erro inesperado. Por favor, tente mais tarde' });
};

module.exports = errorMiddleware;