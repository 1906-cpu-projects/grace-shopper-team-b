const Sequelize = require("sequelize");
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

const conn = require("../conn");

const Product = conn.define("product", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  productName: {
    type: STRING,
    notNull: true,
    notEmpty: true
  },
  description: {
    type: TEXT,
    defaultValue: "Please contact us for more details..."
  },
  price: {
    type: DECIMAL,
    notEmpty: true,
    defaultValue: 99.99
  },
  imageURL: {
    //STRING FOR NOW BUT COULD BE AN ARRAY IF MULTIPLE PHOTOS
    type: STRING,
    defaultValue: "https://live.staticflickr.com/15/89773667_f91cdd7c11.jpg"
  },
  inventory: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 0
    }
  }
});

module.exports = Product;
