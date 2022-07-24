// const { Op } = require("sequelize");
const { AtivosPorUsuario, Ativo, User } = require('../database/models');

const getAllClientAssets = async (codCliente) => {
  const assets = await AtivosPorUsuario.findAll({
    attributes: ['codCliente', 'codAtivo', 'QtdeAtivo'],
    include: [{ model: Ativo, as: 'Ativo', attributes: { exclude: ['name'] } },
    { model: User, as: 'User', through: { attributes: ['codCliente'] } }],
    where: {
      codCliente: codCliente,
    },
  })
  console.log(codCliente);
  return assets;
};

module.exports = { getAllClientAssets };