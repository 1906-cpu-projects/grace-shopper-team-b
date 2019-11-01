const pg = require('pg');

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

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/teamb_graceshopperdb'
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
    type: STRING
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
});

//==============================RELATIONSHIPS==============================

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderProducts);

OrderProducts.belongsTo(Order);
OrderProducts.belongsTo(Product);

//SYNC AND SEED COMING SOON...

const syncAndSeed = async () => {
  await conn.sync({ force: true }); //THIS NEEDS TO BE REMOVED IN FINAL VERSION

  const users = [
    {
      firstName: 'James',
      lastName: 'Fuller',
      username: 'jf',
      email: 'archer@gmail.com',
      password: 'ARCHER',
      wishlist: 'Boomerang, Rocket Sled'
    },
    {
      firstName: 'Rob',
      lastName: 'Wise',
      username: 'rw',
      email: 'caster@gmail.com',
      password: 'CASTER',
      wishlist: 'Batman Outfit, Rocket Sled'
    },
    {
      firstName: 'Paul',
      lastName: 'Blackburn',
      username: 'pb',
      email: 'saber@gmail.com',
      password: 'SABER'
    },
    {
      firstName: 'Dominique',
      lastName: 'Boyer',
      username: 'db',
      email: 'dom@gmail.com',
      password: 'DOM'
    }
  ];

  const [jamesUser, robUser, paulUser, dominiqueUser] = await Promise.all(
    users.map(user => User.create(user))
  );

  const products = [
    { productName: 'Rocket Powered Roller Skates', inventory: 5 },
    {
      productName: 'Jet Propelled Tennis Shoes',
      inventory: 3,
      imageURL:
        'https://storage.googleapis.com/thehundreds/media/2018/09/jet-propelled-tennis-shoes-fleet-foot.png',
      price: 49.99
    },
    {
      productName: 'Artificial Rock',
      inventory: 4,
      imageURL:
        'https://storage.googleapis.com/thehundreds/media/2018/09/artifial-rock-acme.png',
      price: 39.99
    },
    {
      productName: 'Jet Propelled Pogo Stick',
      inventory: 10,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/4/4d/Jet-Propelled_Pogo-Stick.png/revision/latest/scale-to-width-down/100?cb=20150117160112',
      price: 129.99
    },
    {
      productName: 'Boomerang',
      inventory: 8,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/7/7c/Boomerang.png/revision/latest?cb=20150117032356',
      price: 79.99
    },
    {
      productName: 'Super Outfit',
      inventory: 9,
      imageURL: 'https://pbs.twimg.com/media/DQdsYXLX4AAWvWf.jpg',
      price: 19.99
    },
    {
      productName: 'Bat Man Outfit',
      inventory: 7,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/d/da/Bat-Man%27s_Outfit.png/revision/latest/scale-to-width-down/150?cb=20150115225343',
      price: 19.99
    },
    {
      productName: 'Anvil',
      inventory: 50,
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/51O2UPm7CuL.jpg',
      price: 199.99
    },
    {
      productName: 'Iron Carrot',
      inventory: 25,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Iron_Carrot.png/revision/latest?cb=20150115210803',
      price: 29.99
    },
    {
      productName: 'Rocket Sled',
      inventory: 1,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/4/4a/Rocket_Sled.png/revision/latest/scale-to-width-down/150?cb=20150117002527',
      price: 499.99
    },
    {
      productName: 'Giant Rubber Band',
      inventory: 5,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/f/f2/Giant_Rubber_Band_V3.png/revision/latest/scale-to-width-down/150?cb=20150116050517'
    },
    {
      productName: 'Jet Propelled Unicycle',
      inventory: 2,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/1/13/Jet-Propelled_Unicycle.png/revision/latest?cb=20150117160141',
      price: 299.99
    },
    {
      productName: 'Axle Grease',
      inventory: 2,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/d/d1/Axle_Grease.png/revision/latest/scale-to-width-down/150?cb=20150117034005',
      price: 9.99
    },
    {
      productName: 'Dehydrated Boulders',
      inventory: 2,
      imageURL:
        'https://vignette.wikia.nocookie.net/looneytunes/images/7/76/Dehydrated_Boudlers.png/revision/latest?cb=20150116011522',
      price: 299.99
    }
  ];

  const [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14
  ] = await Promise.all(products.map(product => Product.create(product)));

  const orders = [
    { userId: dominiqueUser.id, total: 198.97, status: 'completed' },
    { userId: dominiqueUser.id, total: 99.97, status: 'completed' },
    { userId: dominiqueUser.id, total: 279.94 },
    { userId: dominiqueUser.id, total: 59.97, status: 'completed' },
    { userId: dominiqueUser.id, total: 1059.92, status: 'completed' },
    { userId: robUser.id, total: 499.99, status: 'completed' },
    { userId: robUser.id, total: 398.98 },
    { userId: robUser.id, total: 288.99, status: 'completed' },
    { userId: robUser.id, total: 649.93, status: 'completed' },
    { userId: robUser.id, total: 299.95, status: 'completed' }
  ];
  const [
    order1,
    order2,
    order3,
    order4,
    order5,
    order6,
    order7,
    order8,
    order9,
    order10
  ] = await Promise.all(orders.map(order => Order.create(order)));

  const orderProducts = [
    {
      quantity: 1,
      price: 99.99,
      subTotal: 99.99,
      orderId: order1.id,
      productId: product1.id
    },
    {
      quantity: 2,
      price: 49.99,
      subTotal: 99.98,
      orderId: order1.id,
      productId: product2.id
    },
    {
      quantity: 3,
      price: 39.99,
      subTotal: 119.97,
      orderId: order2.id,
      productId: product3.id
    },
    {
      quantity: 1,
      price: 129.99,
      subTotal: 129.99,
      orderId: order3.id,
      productId: product4.id
    },
    {
      quantity: 1,
      price: 79.99,
      subTotal: 79.99,
      orderId: order3.id,
      productId: product5.id
    },
    {
      quantity: 2,
      price: 19.99,
      subTotal: 39.98,
      orderId: order3.id,
      productId: product6.id
    },
    {
      quantity: 3,
      price: 19.99,
      subTotal: 59.97,
      orderId: order4.id,
      productId: product7.id
    },
    {
      quantity: 5,
      price: 199.99,
      subTotal: 999.95,
      orderId: order5.id,
      productId: product8.id
    },
    {
      quantity: 1,
      price: 29.99,
      subTotal: 29.99,
      orderId: order5.id,
      productId: product9.id
    },
    {
      quantity: 1,
      price: 499.99,
      subTotal: 499.99,
      orderId: order6.id,
      productId: product10.id
    },
    {
      quantity: 1,
      price: 99.99,
      subTotal: 99.99,
      orderId: order7.id,
      productId: product11.id
    },
    {
      quantity: 1,
      price: 299.99,
      subTotal: 299.99,
      orderId: order7.id,
      productId: product12.id
    },
    {
      quantity: 5,
      price: 9.99,
      subTotal: 49.95,
      orderId: order8.id,
      productId: product13.id
    },
    {
      quantity: 2,
      price: 299.99,
      subTotal: 599.98,
      orderId: order8.id,
      productId: product14.id
    },
    {
      quantity: 3,
      price: 99.99,
      subTotal: 299.97,
      orderId: order9.id,
      productId: product1.id
    },
    {
      quantity: 5,
      price: 49.99,
      subTotal: 249.95,
      orderId: order10.id,
      productId: product2.id
    }
  ];

  const [
    orderProduct1,
    orderProduct2,
    orderProduct3,
    orderProduct4,
    orderProduct5,
    orderProduct6,
    orderProduct7,
    orderProduct8,
    orderProduct9,
    orderProduct10,
    orderProduct11,
    orderProduct12,
    orderProduct13,
    orderProduct14,
    orderProduct15,
    orderProduct16
  ] = await Promise.all(
    orderProducts.map(orderProduct => OrderProducts.create(orderProduct))
  );
};

module.exports = {
  syncAndSeed,
  models: {
    Product,
    Guest,
    Order,
    OrderProducts,
    User
  }
};
