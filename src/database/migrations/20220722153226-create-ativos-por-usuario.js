'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AtivosPorUsuarios', {
      codCliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'codCliente'
        },
        primaryKey: true
      },
      codAtivo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'codAtivo'
        },
        primaryKey: true
      },
      QtdeAtivo: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AtivosPorUsuarios');
  }
};