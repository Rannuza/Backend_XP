'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('AtivosPorUsuarios',
    [
      {
        codCliente: 1,
        codAtivo: 1,
        QtdeAtivo: 2,
      },
      {
        codCliente: 2,
        codAtivo: 2,
        QtdeAtivo: 3,
      },
    ], {}),
  down: async (queryInterface) => queryInterface.bulkDelete('AtivosPorUsuarios', null, {}),
};
