import { Sequelize } from "sequelize/types";

const db = new Sequelize(
  process.env.MYSQL_DB_NAME || 'backend_db',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'password',
  {
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || '3306'),
  },
);

export default { db }