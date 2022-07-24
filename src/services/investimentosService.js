const { AtivosPorUsuario, Ativo, User } = require('../database/models');

const buyAsset = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const amount = await Ativo.findOne({
    attributes: ['qtdeAtivo', 'valor'],
    where: { codAtivo },
  });

  if (amount.qtdeAtivo < qtdeAtivo) {
    const err = { status: 409, message: 'Quantidade solicitada excede a quantidade disponível para compra' };
    throw err;
  }

  const requiredValue = amount.valor * qtdeAtivo;
  const user = await User.findOne({
    attributes: ['saldo'],
    where: { codCliente },
  });

  if (requiredValue > user.saldo) {
    const err = { status: 409, message: 'Saldo insuficiente para concluir a compra' };
    throw err;
  }

  const alreadyHaveAssets = await AtivosPorUsuario.findOne({
    attributes: ['QtdeAtivo'],
    where: { codCliente, codAtivo },
  })


  if (!alreadyHaveAssets) {
    const newAmount = amount.qtdeAtivo - qtdeAtivo;
    await Ativo.update({qtdeAtivo: newAmount},{ where: { codAtivo } })

    const newSaldo = user.saldo - requiredValue;
    await User.update({ saldo: newSaldo },{ where: { codCliente } });

    return await AtivosPorUsuario.create({ codCliente, codAtivo, QtdeAtivo: qtdeAtivo });
  }

    const newAmount = amount.qtdeAtivo - qtdeAtivo;
    await Ativo.update({qtdeAtivo: newAmount},{ where: { codAtivo } })

    const newSaldo = user.saldo - requiredValue;
    await User.update({ saldo: newSaldo },{ where: { codCliente } });

    const newQtde = alreadyHaveAssets.QtdeAtivo + qtdeAtivo
    return await AtivosPorUsuario.update({QtdeAtivo: newQtde},{ where: { codCliente, codAtivo} });
};

// const sellAsset = async ({ codCliente, codAtivo, qtdeAtivo }) => {
//   const alreadyHaveAssets = await AtivosPorUsuario.findOne({
//     attributes: ['QtdeAtivo'],
//     where: { codCliente, codAtivo },
//   });

//   if (!alreadyHaveAssets || alreadyHaveAssets.QtdeAtivo < qtdeAtivo) {
//     const err = { status: 409, message: 'Quantidade informada excede a quantidade disponível para venda' };
//     throw err;
//   }

//   const amount = await Ativo.findOne({
//     attributes: ['qtdeAtivo', 'valor'],
//     where: { codAtivo },
//   });

//   const user = await User.findOne({
//     attributes: ['saldo'],
//     where: { codCliente },
//   });

//   const profitValue = amount.valor * qtdeAtivo;

//   const newAmount = amount.qtdeAtivo + qtdeAtivo;
//   await Ativo.update({qtdeAtivo: newAmount},{ where: { codAtivo } })

//   const newSaldo = Number(user.saldo) + Number(profitValue);
//   await User.update({ saldo: newSaldo },{ where: { codCliente } });

//   const newQtde = alreadyHaveAssets.QtdeAtivo - qtdeAtivo
//   return await AtivosPorUsuario.update({QtdeAtivo: newQtde},{ where: { codCliente, codAtivo} });
// };


module.exports = { buyAsset, sellAsset };