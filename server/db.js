const Sequelize = require('sequelize');
const {
  TEXT,
  ARRAY,
  STRING,
  DECIMAL,
  INTEGER,
  UUID,
  UUIDV4,
  DATE,
  ENUM
} = Sequelize;


const conn = require('./conn')

//=====================IMPORT MODELS BELOW================================

const User = require('./models/users')

const Product = require('./models/products')

const Order = require('./models/orders')

const OrderProducts = require('./models/orderproducts')


//==============================RELATIONSHIPS==============================

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderProducts, {as: 'items'});

OrderProducts.belongsTo(Order);
OrderProducts.belongsTo(Product);


//==============================IMPORT SYNC AND SEED==============================

const syncAndSeed = require('./syncandseed')


module.exports = {
  syncAndSeed,
  models: {
    Product,
    Order,
    OrderProducts,
    User
  }
};
