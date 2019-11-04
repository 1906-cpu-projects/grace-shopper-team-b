const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('../db/db');
const { models } = db;
const { Product, User, Order, OrderProducts } = models;

// Setups for express-sessions
const TWO_HOURS = 1000 * 60 * 60 * 2;
const SESS_NAME = 'sid';
const SESS_SECRET = 'BRAVO';
const SESS_LIFETIME = TWO_HOURS;

app.use(express.json());

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

app.get('/users', (req, res, next) => {
  const activeUser = req.session.user;
  if (!activeUser) {
    res.send(`
    <h1>401 Unauthorized Visitor</h1>
    <p>Sorry Doc, the ACME personnel only beyond these doors.</p>
  `);
  }
  if (activeUser && activeUser.isAdmin === true) {
    User.findAll({
      attributes: ['username', 'email', 'firstName', 'lastName']
    })
      .then(users => res.send(users))
      .catch(next);
  }
});

app.get('/users/:id', (req, res, next) => {
  User.findAll({ where: { id: req.params.id } })
    .then(users => res.send(users))
    .catch(next);
});

app.put('/users/:id', (req, res, next) => {
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

app.get('/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/orders', (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: User
      }
    ],
    include: [
      {
        model: OrderProducts,
        as: 'items',
        include: [
          {
            model: Product
          }
        ]
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.get('/orders/:id', (req, res, next) => {
  Order.findAll({ where: { id: req.params.id } })
    .then(order => res.send(order))
    .catch(next);
});

app.put('/orders/:id', (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.paras', req.params);
  Order.findByPk(req.body.id)
    .then(order =>
      order.update({
        status: req.body.status,
        total: req.body.total
      })
    )
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.get('/orders/:id/cart', (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.params.id,
      status: 'cart'
    },
    include: [
      {
        model: User
      }
    ],
    include: [
      {
        model: OrderProducts,
        as: 'items',
        include: [
          {
            model: Product
          }
        ]
      }
    ]
  })
    .then(order => res.send(order))
    .catch(next);
});

app.get('/orderProducts', (req, res, next) => {
  OrderProducts.findAll({
    includes: [
      {
        model: Product
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.post('/orderProducts', async (req, res, next) => {
  Order.findOne({
    where: {
      status: 'cart',
      userId: req.body.userId
    }
  })
    .then(async order => {
      if (!order) {
        order = await Order.create({
          userId: req.body.userId,
          status: 'cart'
        });
      }
      const item = await OrderProducts.create({
        ...req.body,
        orderId: order.id
      });
      res.send(item);
    })
    .catch(err => next(err));
});

app.delete('/orderProducts/:id', async (req, res, next) => {
  await OrderProducts.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

app.put('/orderProducts/:id', async (req, res, next) => {
  const item = await OrderProducts.update(
    { quantity: req.body.quantity },
    { where: { id: req.body.id } }
  );
  console.log(item);
  res.send(item);
});

//===================COMPLETED ORDERS=========================

app.get('/completedorders', (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: OrderProducts
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.get('/completedOrders/:id', (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: OrderProducts,
        where: { id: req.params.id }
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

//===================END COMPLETED ORDERS=====================

// Login

app.post('/sessions', (req, res, next) => {
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

app.get('/sessions', (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return res.send(user);
  }
  next({ status: 401 });
});

app.delete('/sessions', (req, res, next) => {
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

module.exports = app;
