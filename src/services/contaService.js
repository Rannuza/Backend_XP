const { User } = require('../database/models');

const postDeposit = async (codCliente, valor) => {
  const user = await User.findOne({ attributes: ['saldo'], where: { codCliente } });

  if (!user) {
    const err = { status: 404, message: 'Usuário não localizado' };
    throw err;
  }
  
  const soma = Number(user.saldo) + Number(valor);
  await User.update({ saldo: soma },{ where: { codCliente } });
  const { saldo } = await User.findOne({ attributes: ['saldo'], where: { codCliente }});
  return { codCliente, valor_Depositado: valor, saldo };
};
 
module.exports = { postDeposit };