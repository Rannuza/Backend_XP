const express = require('express');
const rescue = require('express-rescue');

const ativosRoutes = express.Router();
const ativosService = require('../services/ativosService')


ativosRoutes.get('/cliente/:codCliente', rescue(async (req, res) => {
  const { codCliente } = req.params;
  const assets = await ativosService.getAllClientAssets(codCliente)
  res.status(200).json(assets);
}));

ativosRoutes.get('/:codAtivo', rescue(async (req, res) => {
  const { codAtivo } = req.params;
  const assets = await ativosService.getAssetsById(codAtivo)
  res.status(200).json(assets);
}));

module.exports = ativosRoutes;