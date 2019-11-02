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

const Order = conn.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  status: {
    type: ENUM('cart', 'completed'),
    defaultValue: 'cart'
  },
  orderDate: {
    type: DATE
  },
  shippingAddress: {
    type: TEXT
  },
  total: {
    type: DECIMAL,
    defaultValue: 0.0
  }
});

module.exports = Order
