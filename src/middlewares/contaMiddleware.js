const validateOperation = (req, res, next) => {
  const { codCliente, valor } = req.body;

  if (valor <= 0) {
    return res.status(400)
      .json({ message: 'O valor não atingiu o minímo estipulado' });
  }

  if (!codCliente || !valor ) {
    return res.status(400)
      .json({ message: 'Algum campo obrigatório está faltando' });
  }

  next();
};

module.exports = validateOperation;