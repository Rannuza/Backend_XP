'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Ativos',
    [
      {
        codAtivo: 1,
        name: 'Ativo1',
        qtdeAtivo: 100,
        valor: 350.00
      },
      {
        codAtivo: 2,
        name: 'Ativo2',
        qtdeAtivo: 100,
        valor: 50.00
      },
    ], {}),
  down: async (queryInterface) => queryInterface.bulkDelete('Ativos', null, {}),
};
