

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

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    notEmpty: true,
    notNull: true,
    unique: true
  },
  password: {
    type: STRING,
    notNull: true,
    notEmpty: true
  },
  email: {
    type: STRING,
    notEmpty: true,
    notNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  streetAddress: {
    type: STRING
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  zipcode: {
    type: INTEGER
  },
  billStreetAddress: {
    type: STRING
  },
  billCity: {
    type: STRING
  },
  billState: {
    type: STRING
  },
  billZipcode: {
    type: INTEGER
  }
});

module.exports = User;
