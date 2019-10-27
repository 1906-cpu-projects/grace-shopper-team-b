const pg = require('pg');

const Sequelize = require('sequelize');

const {TEXT, ARRAY, STRING, DECIMAL, INTEGER, UUID, UUIDV4} = Sequelize;

const conn = new Sequelize(process.env.DATABASE || 'postgres://localhost/teamb-graceshopperdb')

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
  name: {
    type: STRING
  }

  /* COMMMENTING THIS OUT FOR NOW AS NOT SURE HOW THIS WILL WORK
  ,
  cart: {
    type: ARRAY(INTEGER),
    defaultValue: []
  }
  */
});

const Product = conn.define('product', {
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

//==============================ORDERS?==============================
//==============HOW TO HANDLE ORDERS? SEPERATE MODEL OR ARRAY ON USER?

//==============================CART?==============================
//==============HOW TO HANDLE CART? SEPERATE MODEL OR ARRAY ON USER?
//==============SHOULD CART BY HANDLED BY STORE AND FRONT END? WILL THIS BE PERSISTENT?


//SYNC AND SEED COMING SOON...

const syncAndSeed = async() => {
  await conn.sync({ force: true}); //THIS NEEDS TO BE REMOVED IN FINAL VERSION

  const users = [

  ]

  const [] = await Promise.all(users.map(user => User.create(user)));

  const products = [

  ]

    const [] = await Promise.all(products.map(product => Product.create(product)));

}


module.exports = {
  syncAndSeed,
  models: {
    Product,
    User
  }
}

