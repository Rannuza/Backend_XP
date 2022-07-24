// const { Op } = require("sequelize");
const { AtivosPorUsuario, Ativo, User } = require('../database/models');

const getAllClientAssets = async (codCliente) => {
  const assets = await AtivosPorUsuario.findAll({
    where: { codCliente: codCliente },
    attributes: ['codCliente', 'codAtivo', 'QtdeAtivo'],
  });

  const findValues = await Ativo.findAll({
    attributes: ['codAtivo', 'valor']
  });
  
  const result = assets.map((asset) => {
    findValues.map((value) => {
      if (asset.codAtivo === value.codAtivo) {
        asset = {
          codCliente: asset.codCliente,
          codAtivo: asset.codAtivo,
          QtdeAtivo: asset.QtdeAtivo,
          valor: value.valor,
        };
      }
      return asset;
    });
    return asset;
  });
  return result;
};

const getAssetsById = async (codAtivo) => {
  const asset = await Ativo.findOne({ where: { codAtivo }});
  return asset;
};

module.exports = { getAllClientAssets, getAssetsById };