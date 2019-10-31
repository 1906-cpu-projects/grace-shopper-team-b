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

const Sequelize = require('sequelize');

//ISSUES WITH WEBPACK - COMMENTING OUT THE BELOW
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

const port = process.env.PORT || 3000;

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

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/orders', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next);
});

app.get('/api/orderProducts', (req, res, next) => {
  OrderProducts.findAll()
    .then(orders => res.send(orders))
    .catch(next);
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
  console.log(req.session);
  req.session.destroy();
  req.session = null;
  res.sendStatus(204);
  console.log(req.session);
});

db.syncAndSeed().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});

module.exports = app;
