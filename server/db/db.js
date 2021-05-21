const Sequelize = require("sequelize");

//Establishing MySQL database connection using Sequelize
const db = new Sequelize("full_stack_assi", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
