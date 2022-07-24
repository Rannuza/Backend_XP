const ativoSchema = (sequelize, DataTypes) => {
  const ativoTable = sequelize.define("Ativo", {
    codAtivo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    qtdeAtivo: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL
}, { timestamps: false,  tableName: 'Ativos' });

  ativoTable.associate = (models) => {
    ativoTable.belongsToMany(models.User, { through: { model: 'AtivosPorUsuario'} });
    ativoTable.hasMany(models.AtivosPorUsuario, {
      foreignKey: 'codAtivo',
      as: 'tabelaDeRelacionamento'
    });
  }

  return ativoTable;
}

module.exports = ativoSchema;