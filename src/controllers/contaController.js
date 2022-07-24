const express = require('express');
const rescue = require('express-rescue');

const contaRoutes = express.Router();
const contaService = require('../services/contaService');
const userService = require('../services/userService');
const validateOperation = require('../middlewares/contaMiddleware');

contaRoutes.get('/:codCliente', rescue(async (req, res) => {
  const { codCliente } = req.params;
  const user = await userService.getUserInfos(codCliente);
  res.status(200).json(user);
}));

contaRoutes.post('/deposito', validateOperation, rescue(async (req, res) => {
  const { codCliente, valor } = req.body;
  const depositInfos = await contaService.postDeposit(codCliente, valor);
  res.status(201).json(depositInfos);
}));

contaRoutes.post('/saque', validateOperation, rescue(async (req, res) => {
  const { codCliente, valor } = req.body;
  const saqueInfos = await contaService.postSaque(codCliente, valor);
  res.status(201).json(saqueInfos);
}));

module.exports = contaRoutes;