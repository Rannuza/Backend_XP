const validatePurchase = (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  if (qtdeAtivo <= 0) {
    return res.status(400)
      .json({ message: 'A quantidade miníma é 1' });
  }

  if (!codCliente || !codAtivo || !qtdeAtivo ) {
    return res.status(400)
      .json({ message: 'Algum campo obrigatório está faltando' });
  }

  next();
};

module.exports = validatePurchase;