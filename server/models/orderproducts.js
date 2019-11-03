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

const conn = require('../conn')

const OrderProducts = conn.define('orderproducts', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  quantity: {
    type: INTEGER,
    validate: {
      min: 1
    }
  },
  price: {
    type: DECIMAL,
    notEmpty: true
  },
  subTotal: {
    type: DECIMAL,
    notEmpty: true
  }
});

module.exports = OrderProducts
