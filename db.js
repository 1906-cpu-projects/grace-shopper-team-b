const pg = require('pg');

const Sequelize = require('sequelize');

const { TEXT, ARRAY, STRING, DECIMAL, INTEGER, UUID, UUIDV4, DATE, ENUM } = Sequelize;

const conn = new Sequelize(
  process.env.DATABASE || 'postgres://localhost/teamb_graceshopperdb'
);

//USERS COMMENTED OUT UNTIL PRODUCTS WORKS

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
  shippingAddress: {
    type: STRING
  },
  billingAddress: {
    type: STRING
  },
  cart: {
    type: ARRAY(INTEGER),
    defaultValue: []
  },
  wishlist: {
    type: ARRAY(INTEGER),
    defaultValue: []
  }
});

const Guest = conn.define('guest', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  cart: {
    type: ARRAY(INTEGER),
    defaultValue: []
  },
  wishlist: {
    type: ARRAY(INTEGER),
    defaultValue: []
  }
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
    defaultValue: 'Please contact us for more details...'
  },
  price: {
    type: DECIMAL,
    notEmpty: true,
    defaultValue: 99.99
  },
  imageURL: {
    //STRING FOR NOW BUT COULD BE AN ARRAY IF MULTIPLE PHOTOS
    type: STRING,
    defaultValue: 'https://live.staticflickr.com/15/89773667_f91cdd7c11.jpg'
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
  orderDate:{
    type: DATE
  },
  shippingAddress: {
    type: TEXT
  },
  total: {
    type: DECIMAL,
    defaultValue: 0.00
  }
});

//==============================CART?==============================
//==============HOW TO HANDLE CART? SEPERATE MODEL OR ARRAY ON USER?
//==============SHOULD CART BY HANDLED BY STORE AND FRONT END? WILL THIS BE PERSISTENT?
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
})

//==============================RELATIONSHIPS==============================

User.hasMany(Order)
Order.belongsTo(User)
Order.hasMany(OrderProducts);

OrderProducts.belongsTo(Order)
OrderProducts.belongsTo(Product)



//SYNC AND SEED COMING SOON...

const syncAndSeed = async () => {
  await conn.sync({ force: true }); //THIS NEEDS TO BE REMOVED IN FINAL VERSION

  const users = [
    { firstName: 'James', lastName: 'Fuller', username: 'jf', email: 'archer@gmail.com', password: 'ARCHER' },
    { firstName: 'Rob', lastName: 'Wise', username: 'rw', email: 'caster@gmail.com', password: 'CASTER' },
    { firstName: 'Paul', lastName: 'Blackburn', username: 'pb', email: 'saber@gmail.com', password: 'SABER' },
    { firstName: 'Dominique', lastName: 'Boyer', username: 'db', email: 'lancer@gmail.com', password: 'LANCER' }
  ];

  const [jamesUser, robUser, paulUser, dominiqueUser] = await Promise.all(
    users.map(user => User.create(user))
  );

  const products = [
    { productName: 'acme product 1' },
    { productName: 'acme product 2' },
    { productName: 'acme product 3' }
  ];

  const [product1, product2, product3] = await Promise.all(
    products.map(product => Product.create(product))
  );
};

module.exports = {
  syncAndSeed,
  models: {
    Product,
    Guest,
    Order,
    User
  }
};
