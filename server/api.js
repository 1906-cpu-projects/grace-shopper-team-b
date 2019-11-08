const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('../db/db');
const { models } = db;
const { Product, User, Order, OrderProducts } = models;

const dotenv = require('dotenv')

dotenv.config()

const stripeSecretKey = process.env.stripeSecretKey;
const stripeLoader = require('stripe');

const hash = require('../src/utilities/hash');


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
    return res.status(401).json({
      message: 'Auth Failed'
    });
  }
  return User.findAll({
    attributes: ['username', 'email', 'firstName', 'lastName', 'id']
  })
    .then(users => res.send(users))
    .catch(next);
});

app.get('/users/:id', (req, res, next) => {
  User.findByPk(req.params.id, {
    attributes: ['username', 'email', 'firstName', 'lastName', 'id']
  })
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
  // const activeUser = req.session.user;
  // if (!activeUser) {
  //   res.send(`
  //   <h1>401 Unauthorized Visitor</h1>
  //   <p>Sorry Doc, only ACME personnel are allowed beyond these doors.</p>
  // `);
  // }
  // if (activeUser && activeUser.isAdmin === true) {
  Order.findAll({
    include: [
      {
        model: User,
        where: { id: req.params.id }
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
  // }
});

app.get('/orders/:id', (req, res, next) => {
  Order.findAll({ where: { id: req.params.id } })
    .then(order => res.send(order))
    .catch(next);
});

app.put('/orders/:id', (req, res, next) => {
  Order.findByPk(req.body.id)
    .then(order =>{
      console.log('order in api', order)
      console.log('req.body', req.body)
      order.update({
        total: req.body.total
      })

    }
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
      const itemAlreadyInCart = await OrderProducts.findOne({
        where: {
          productId: req.body.productId,
          orderId: order.id
        }
      });
      // console.log('item in cart', itemAlreadyInCart)
      // console.log('req body', req.body)
      if (!itemAlreadyInCart) {
        let item = await OrderProducts.create({
          ...req.body,
          orderId: order.id
        });
      } else {
        item = await OrderProducts.update(
          {
            quantity: itemAlreadyInCart.quantity + 1,
            subTotal: itemAlreadyInCart.price * (itemAlreadyInCart.quantity + 1)
          },
          { where: { id: itemAlreadyInCart.id } }
        );
      }
      res.send(item);
    })
    .catch(err => next(err));
});

app.delete('/orderProducts/:id', async (req, res, next) => {
  await OrderProducts.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

app.put('/orderProducts/:id', async (req, res, next) => {
  OrderProducts.findByPk(req.body.id)
    .then(item =>
      item.update({
        quantity: req.body.quantity,
        subTotal: req.body.subTotal
      })
    )
    .then(() => res.sendStatus(201))
    .catch(next);
});

//===================COMPLETED ORDERS=========================

app.get('/completedorders', (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: OrderProducts,
        as: 'items'
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
        as: 'items',
        where: { userId: req.params.id }
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

//===================END COMPLETED ORDERS=====================

// Signup

app.post('/signup', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log('Missing requested information.');
    res.sendStatus(400);
  } else {
    const { email, password } = req.body;
    User.create({
      email,
      password: hash(password, process.env.SALT)
    })
      .then(() => {
        res.send({
          message: 'User created successfully!'
        });
      })
      .catch(ev => {
        res.status(500).send({
          message: ev.message
        });
      });
  }
});

// Login

app.post('/sessions', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: hash(req.body.password, process.env.SALT)
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

/// Stripe ////

const stripe = new stripeLoader(stripeSecretKey);

const charge = (token, amt) => {
  return stripe.charges.create({
    amount: (amt * 100),
    currency: 'usd',
    source: token,
    description: 'Statement Description'
  });
};

app.post('/checkout', async (req, res, next) => {
  console.log('request: ', req.body)
  try {
    let data = await charge(req.body.token.id, req.body.amount);
    console.log('data', data);
    res.send('Charged!');
  } catch (er) {
    console.log(er);
    res.sendStatus(500);
  }
});
////////////

// Page Not Fount Route
app.get('*', (req, res) => {
  res.send(`
    <h1>404 Page Not Found</h1>
    <p>Sorry, that page doesn't exist, Doc. :(</p>
  `);
});

module.exports = app;
