const express = require('express');
const rescue = require('express-rescue');

const ativosRoutes = express.Router();
const ativosService = require('../services/ativosService')


ativosRoutes.get('/cliente/:codCliente', rescue(async (req, res) => {
  const { codCliente } = req.params;
  const assets = await ativosService.getAllClientAssets(codCliente)
  res.status(201).json(assets);
}));

// ativosRoutes.post('/vender', validatePurchase, rescue(async (req, res) => {

//   await investimentosService.sellAsset(req.body)
//   res.status(201).json(req.body);
// }));

module.exports = ativosRoutes;