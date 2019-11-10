const conn = require("./conn");

const User = require("./models/users");

const Product = require("./models/products");

const Order = require("./models/orders");

const OrderProducts = require("./models/orderproducts");

const hash = require("../src/utilities/hash");

const syncAndSeed = async () => {
  await conn.sync({ force: true }); //THIS NEEDS TO BE REMOVED IN FINAL VERSION

  const users = [
    {
      firstName: "James",
      lastName: "Fuller",
      username: "jf",
      email: "archer@gmail.com",
      password: hash("ARCHER"),
      streetAddress: "123 Some Street ",
      city: "Some City",
      state: "California",
      zipcode: "12345",
      billStreetAddress: "123 Some Street ",
      billCity: "Some City",
      billState: "California",
      billZipcode: "12345",
      isAdmin: true
    },
    {
      firstName: "Rob",
      lastName: "Wise",
      username: "rw",
      email: "caster@gmail.com",
      password: hash("CASTER"),
      isAdmin: true
    },
    {
      firstName: "Paul",
      lastName: "Blackburn",
      username: "pb",
      email: "saber@gmail.com",
      password: hash("SABER"),
      streetAddress: "888 New Street ",
      city: "New Town",
      state: "California",
      zipcode: "78787",
      billStreetAddress: "888 New Street ",
      billCity: "New Town",
      billState: "California",
      billZipcode: "78787",
      isAdmin: false
    },
    {
      firstName: "Dominique",
      lastName: "Boyer",
      username: "db",
      email: "dom@gmail.com",
      password: hash("DOM")
    }
  ];

  const [jamesUser, robUser, paulUser, dominiqueUser] = await Promise.all(
    users.map(user => User.create(user))
  );

  const products = [
    { productName: "Rocket Powered Roller Skates", inventory: 5 },
    {
      productName: "Jet Propelled Tennis Shoes",
      inventory: 3,
      imageURL:
        "https://storage.googleapis.com/thehundreds/media/2018/09/jet-propelled-tennis-shoes-fleet-foot.png",
      price: 49.99
    },
    {
      productName: "Artificial Rock",
      inventory: 4,
      imageURL:
        "https://storage.googleapis.com/thehundreds/media/2018/09/artifial-rock-acme.png",
      price: 39.99
    },
    {
      productName: "Jet Propelled Pogo Stick",
      inventory: 10,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/4/4d/Jet-Propelled_Pogo-Stick.png/revision/latest/scale-to-width-down/100?cb=20150117160112",
      price: 129.99
    },
    {
      productName: "Boomerang",
      inventory: 8,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/7/7c/Boomerang.png/revision/latest?cb=20150117032356",
      price: 79.99
    },
    {
      productName: "Super Outfit",
      inventory: 9,
      imageURL: "https://pbs.twimg.com/media/DQdsYXLX4AAWvWf.jpg",
      price: 19.99
    },
    {
      productName: "Bat Man Outfit",
      inventory: 7,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/d/da/Bat-Man%27s_Outfit.png/revision/latest/scale-to-width-down/150?cb=20150115225343",
      price: 19.99
    },
    {
      productName: "Anvil",
      inventory: 50,
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/51O2UPm7CuL.jpg",
      price: 199.99
    },
    {
      productName: "Iron Carrot",
      inventory: 25,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Iron_Carrot.png/revision/latest?cb=20150115210803",
      price: 29.99
    },
    {
      productName: "Rocket Sled",
      inventory: 1,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/4/4a/Rocket_Sled.png/revision/latest/scale-to-width-down/150?cb=20150117002527",
      price: 499.99
    },
    {
      productName: "Giant Rubber Band",
      inventory: 5,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/f/f2/Giant_Rubber_Band_V3.png/revision/latest/scale-to-width-down/150?cb=20150116050517"
    },
    {
      productName: "Jet Propelled Unicycle",
      inventory: 2,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/1/13/Jet-Propelled_Unicycle.png/revision/latest?cb=20150117160141",
      price: 299.99
    },
    {
      productName: "Axle Grease",
      inventory: 2,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/d/d1/Axle_Grease.png/revision/latest/scale-to-width-down/150?cb=20150117034005",
      price: 9.99
    },
    {
      productName: "Dehydrated Boulders",
      inventory: 2,
      imageURL:
        "https://vignette.wikia.nocookie.net/looneytunes/images/7/76/Dehydrated_Boudlers.png/revision/latest?cb=20150116011522",
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
    { userId: dominiqueUser.id, total: 198.97, status: "completed" },
    { userId: dominiqueUser.id, total: 99.97, status: "completed" },
    { userId: dominiqueUser.id, total: 249.96 },
    { userId: dominiqueUser.id, total: 59.97, status: "completed" },
    { userId: dominiqueUser.id, total: 1059.92, status: "completed" },
    { userId: robUser.id, total: 499.99, status: "completed" },
    { userId: robUser.id, total: 398.98 },
    { userId: robUser.id, total: 288.99, status: "completed" },
    { userId: robUser.id, total: 649.93, status: "completed" },
    { userId: robUser.id, total: 299.95, status: "completed" }
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
  return {
    products: {
      product1,
      product2
    },
    users: {
      jamesUser,
      paulUser,
      dominiqueUser
    },
    orders: {
      order1,
      order2
    }
  };
};

module.exports = syncAndSeed;
