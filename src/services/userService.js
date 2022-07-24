const { User } = require('../database/models');

const getUserInfos = async (codCliente) => {
  const user = await User.findOne({ attributes: ['codCliente', 'saldo'], where: { codCliente } });
  if (!user) {
    const err = { status: 404, message: 'Usuário não localizado' };
    throw err;
  }
  return user;
};


module.exports = { getUserInfos };