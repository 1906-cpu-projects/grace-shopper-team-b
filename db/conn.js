const Sequelize = require('sequelize');

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/teamb_graceshopperdb'
);

module.exports = conn
