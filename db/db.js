const Sequelize = require('sequelize');


const conn = require('./conn');

//=====================IMPORT MODELS BELOW================================

const User = require('./models/users');

const Product = require('./models/products');

const Order = require('./models/orders');

const OrderProducts = require('./models/orderproducts');

//==============================RELATIONSHIPS==============================

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderProducts, { as: 'items' });

OrderProducts.belongsTo(Order);
OrderProducts.belongsTo(Product);

//==============================IMPORT SYNC AND SEED==============================

const syncAndSeed = require('./syncandseed');

module.exports = {
  syncAndSeed,
  conn,
  models: {
    Product,
    Order,
    OrderProducts,
    User
  }
};
