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
    models.User.belongsToMany(models.Ativo, { through: ativosPorUsuarioTable });
    models.Ativo.belongsToMany(models.User, { through: ativosPorUsuarioTable });
    ativosPorUsuarioTable.belongsTo(models.User,  {
      foreignKey: 'codCliente',
      as: 'relacionamentos'
    });
    ativosPorUsuarioTable.belongsTo(models.Ativo, {
      foreignKey: 'codAtivo',
      as: 'tabelaDeRelacionamentos'
    });
  }
  return ativosPorUsuarioTable;
}

module.exports = ativosPorUsuarioSchema;