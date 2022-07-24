const express = require('express');
const rescue = require('express-rescue');

const contaRoutes = express.Router();
const contaService = require('../services/contaService');
const validateOperation = require('../middlewares/contaMiddleware');



contaRoutes.post('/deposito', validateOperation, rescue(async (req, res) => {
  const { codCliente, valor } = req.body;
  const depositInfos = await contaService.postDeposit(codCliente, valor);
  res.status(200).json(depositInfos);
}));

contaRoutes.post('/saque', validateOperation, rescue(async (req, res) => {
  const { codCliente, valor } = req.body;
  const saqueInfos = await contaService.postSaque(codCliente, valor);
  res.status(200).json(saqueInfos);
}));

module.exports = contaRoutes;