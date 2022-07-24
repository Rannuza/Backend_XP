const express = require('express');
const rescue = require('express-rescue');

const investimentosRoutes = express.Router();
const investimentosService = require('../services/investimentosService')
const validatePurchase = require('../middlewares/validatePurchaseMiddleware');

investimentosRoutes.post('/comprar', validatePurchase, rescue(async (req, res) => {

  await investimentosService.buyAsset(req.body)
  res.status(201).json(req.body);
}));

investimentosRoutes.post('/vender', validatePurchase, rescue(async (req, res) => {

  await investimentosService.sellAsset(req.body)
  res.status(201).json(req.body);
}));

module.exports = investimentosRoutes;