const express = require('express');
const rescue = require('express-rescue');

const contaRoutes = express.Router();
const contaService = require('../services/contaService');
const validateDeposit = require('../middlewares/contaMiddleware');



contaRoutes.post('/deposito', validateDeposit, rescue(async (req, res) => {
  const { codCliente, valor } = req.body;
  const depositInfos = await contaService.postDeposit(codCliente, valor);
  res.status(200).json(depositInfos);
}));

module.exports = contaRoutes;