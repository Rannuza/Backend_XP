const ativosPorUsuarioSchema = (sequelize, DataTypes) => {
  const ativosPorUsuarioTable = sequelize.define("AtivosPorUsuario", {
    codCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true
      },
    codAtivo: {
      type: DataTypes.INTEGER,
      primaryKey: true
      },
    QtdeAtivo: DataTypes.INTEGER
}, { timestamps: false,  tableName: 'AtivosPorUsuarios' });

  ativosPorUsuarioTable.associate = (models) => {
    models.User.belongsToMany(models.Ativo, {
      as: 'Users',
      through: ativosPorUsuarioTable,
      foreignKey: 'codCliente',
      otherKey: 'codCliente',
    });
    models.Ativo.belongsToMany(models.User, {
      as: 'Ativos',
      through: ativosPorUsuarioTable,
      foreignKey: 'codAtivo',
      otherKey: 'codAtivo',
    })
  }

  return ativosPorUsuarioTable;
}

module.exports = ativosPorUsuarioSchema;