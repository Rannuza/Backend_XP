const validateDeposit = (req, res, next) => {
  const { codCliente, valor } = req.body;

  if (valor <= 0) {
    return res.status(400)
      .json({ message: 'O valor de depósito não atingiu o valor minímo estipulado' });
  }

  if (!codCliente || !valor ) {
    return res.status(400)
      .json({ message: 'Algum campo obrigatório está faltando' });
  }

  next();
};

module.exports = validateDeposit;