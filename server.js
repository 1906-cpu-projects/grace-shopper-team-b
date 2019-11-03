const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('./db');
const { models } = require('./db');
const { Product, User, Guest, Order, OrderProducts } = models;

// Setups for express-sessions
const TWO_HOURS = 1000 * 60 * 60 * 2;
const SESS_NAME = 'sid';
const SESS_SECRET = 'BRAVO';
const SESS_LIFETIME = TWO_HOURS;

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true
    }
  })
);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/users/:id', (req, res, next) => {
  User.findAll({ where: { id: req.params.id } })
    .then(users => res.send(users))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(_user =>
      _user.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        billStreetAddress: req.body.billStreetAddress,
        billCity: req.body.billCity,
        billState: req.body.billState,
        billZipcode: req.body.billZipcode
      })
    )
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/orders', (req, res, next) => {
  Order.findAll({
    include: [{
      model: User
    }],
    include:[{
      model: OrderProducts,
      as: 'items',
      include: [{
        model: Product
      }]
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.get('/api/orders/:id/cart', (req, res, next)=> {
  Order.findOne({
    where: {
      userId: req.params.id,
      status: 'cart'
    },
    include: [{
      model: User
    }],
    include:[{
      model: OrderProducts,
      as: 'items',
      include: [{
        model: Product
      }]
    }]
  })
    .then(order => res.send(order))
    .catch(next);
});

app.get('/api/orderProducts', async (req, res, next) => {
  try{
    const orderProducts = await OrderProducts.findAll({
      include: [{
        model: Product
      }]
    });
    res.send(orderProducts)
  }
  catch(er){
    next(er)
  }
  // OrderProducts.findAll({
  //   includes: [{
  //     model: Product,
  //     as: 'productInfo'
  //   }]
  // })
  //   .then(orders => res.send(orders))
  //   .catch(next);
});

app.post('/api/orderProducts', async (req, res, next) => {
  Order.findOne({
    where: {
      status: 'cart',
      userId: req.body.userId
    }
  })
    .then( async order => {
      if(!order){
        order = await Order.create({
          userId: req.body.userId,
          status: 'cart'})
      }
      const item = await OrderProducts.create({...req.body, orderId: order.id})
      res.send(item);
    })
    .catch(err => next(err));
});

app.delete('/api/orderProducts/:id', async (req, res, next) => {
  await OrderProducts.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

app.put('/api/orderProducts/:id', async (req, res, next) => {
  const item = await OrderProducts.update(
    { quantity: req.body.quantity },
    { where: { id: req.body.id } }
  );
  console.log(item);
  res.send(item);
});

// Login

app.post('/api/sessions', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (!user) {
        throw { status: 401 };
      }
      req.session.user = user;
      return res.send(user);
    })
    .catch(err => next(err));
});

app.get('/api/sessions', (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return res.send(user);
  }
  next({ status: 401 });
});

app.delete('/api/sessions', (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.sendStatus(204);
});

// Page Not Fount Route
app.get('*', (req, res) => {
  res.send(`
    <h1>404 Page Not Found</h1>
    <p>Sorry, that page doesn't exist, Doc. :(</p>
  `);
});

db.syncAndSeed().then(() => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});

module.exports = app;
