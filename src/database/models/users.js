const userSchema = (sequelize, DataTypes) => {
  const userTable = sequelize.define("User", {
    codCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataDeNascimento: DataTypes.DATE,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    saldo: DataTypes.DECIMAL
}, { timestamps: false,  tableName: 'Users' });

  userTable.associate = (models) => {
    userTable.belongsToMany(models.Ativo, { through: { model: 'AtivosPorUsuario'} });
    userTable.hasMany(models.AtivosPorUsuario,  {
      foreignKey: 'codCliente',
      as: 'relacionamento'
    });
  }

  return userTable;
}

module.exports = userSchema;