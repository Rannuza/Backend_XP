'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        codCliente: 1,
        full_name: 'Aline Alves',
        cpf: '123.456.789-10',
        birth_date: new Date('1992-11-29'),
        telefone: '81997283546',
        email: 'aline@teste.com.br',
        password: 159357,
        saldo: 700.00
      },
      {
        codCliente: 2,
        full_name: 'Beatriz Bernardes',
        cpf: '987.654.321-01',
        birth_date: new Date('2000-01-19'),
        telefone: '81984162573',
        email: 'beatriz@teste.com.br',
        password: 753951,
        saldo: 150.00
      },
    ], {}),
  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
