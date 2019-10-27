const pg = require('pg');

const Sequelize = require('sequelize');

const {TEXT, STRING, INTEGER, UUID, UUIDV4} = Sequelize;

const conn = new Sequelize(process.env.DATABASE || 'postgres://localhost/teamb-graceshopperdb')




//SYNC AND SEED COMING SOON...
/*
const syncAndSeed = async() => {
  await conn.sync({ force: true}); //THIS NEEDS TO BE REMOVED IN FINAL VERSION


}

module.exports = {
  syncAndSee,
  models: {

  }
}
*/
