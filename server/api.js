const express = require("express");
const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const path = require("path");
const app = express();
const db = require("../db/db");
const { models } = db;
const { Product, User, Order, OrderProducts } = models;

const dotenv = require("dotenv");
dotenv.config();
const stripeSecretKey = process.env.stripeSecretKey;
const stripeLoader = require("stripe");

const hash = require("../src/utilities/hash");

const sequelizeSessionStore = new SessionStore({
  db: db.conn
});

// Setups for express-sessions
const TWO_HOURS = 1000 * 60 * 60 * 2;
const SESS_NAME = "sid";
const SESS_SECRET = "BRAVO";
const SESS_LIFETIME = TWO_HOURS;

app.use(express.json());

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: sequelizeSessionStore,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true
    }
  })
);

app.get("/users", (req, res, next) => {
  const activeUser = req.session.user;
  if (!activeUser) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
  if (req.session.user.isAdmin === true) {
    return User.findAll()
      .then(users => res.send(users))
      .catch(next);
  } else {
    return User.findAll({
      attributes: ["username", "email", "firstName", "lastName", "id"]
    })
      .then(users => res.send(users))
      .catch(next);
  }
});

app.get("/admin/users", (req, res, next) => {
  const activeUser = req.session.user;
  if (!activeUser || req.session.user.isAdmin === false) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
  return User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get("/users/:id", (req, res, next) => {
  const activeUser = req.session.user;
  if (
    !activeUser ||
    (req.session.user.id !== req.params.id &&
      req.session.user.isAdmin === false)
  ) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
  return User.findByPk(req.params.id)
    .then(users => res.send(users))
    .catch(next);
});

app.put("/users/:id", (req, res, next) => {
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

app.delete("/users/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then(_user => _user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.get("/products", (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get("/products/:id", (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(products => res.send(products))
    .catch(next);
});

app.post("/products", (req, res, next) => {
  Product.create(req.body).then(_product => res.status(201).send(_product));
});

app.put("/products/:id", (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(_product =>
      _product.update({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        imageURL: req.body.imageURL,
        inventory: req.body.inventory
      })
    )
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.delete("/products/:id", (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(_product => _product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.get("/orders", (req, res, next) => {
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
        as: "items",
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

<<<<<<< HEAD
app.get("/orders/:id", (req, res, next) => {
  Order.findAll({ where: { id: req.params.id } })
||||||| merged common ancestors
app.get('/orders/:id', (req, res, next) => {
  Order.findAll({ where: { id: req.params.id } })
=======
app.get('/orders/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
>>>>>>> c5bb80444a6856898d1f072720a6bbe6def9178d
    .then(order => res.send(order))
    .catch(next);
});

app.delete("/orders/:id", (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(_order => _order.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.put("/orders/:id", (req, res, next) => {
  Order.findByPk(req.body.id)
    .then(order => {
      console.log("order in api", order);
      console.log("req.body", req.body);

      order.update({
        total: req.body.total,
        items: req.body.items
      });
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.get("/orders/:id/cart", (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.params.id,
      status: "cart"
    },
    include: [
      {
        model: User
      }
    ],
    include: [
      {
        model: OrderProducts,
        as: "items",
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

app.get("/orderProducts", (req, res, next) => {
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

app.post("/orderproducts", async (req, res, next) => {
  //let item = null;

  Order.findOne({
    where: {
      status: "cart",
      userId: req.body.userId
    }
  })
    .then(async order => {
      if (!order) {
        order = await Order.create({
          userId: req.body.userId,
          status: "cart"
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
      let item
      if (!itemAlreadyInCart) {
        item = await OrderProducts.create({
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

app.delete("/orderProducts/:id", async (req, res, next) => {
  await OrderProducts.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

app.put("/orderProducts/:id", async (req, res, next) => {
  console.log("req.body for order products", req.body);

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

app.get("/completedorders", (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: OrderProducts,
        as: "items"
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.get("/completedOrders/:id", (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: OrderProducts,
        as: "items",
        where: { userId: req.params.id }
      }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

//===================END COMPLETED ORDERS=====================

// Signup

app.post("/signup", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log("Missing requested information.");
    res.sendStatus(400);
  } else {
    const { email, password } = req.body;
    User.create({
      email,
      password: hash(password, process.env.SALT)
    })
      .then(() => {
        res.send({
          message: "User created successfully!"
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

app.post("/sessions", (req, res, next) => {
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

app.get("/sessions", (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return res.send(user);
  }
  next({ status: 401 });
});

app.delete("/sessions", (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.sendStatus(204);
});

/// Stripe ////
const stripe = new stripeLoader(stripeSecretKey);

const charge = (token, amt) => {
  return stripe.charges.create({
    amount: (amt * 100).toFixed(0),
    currency: "usd",
    source: token,
    description: "Statement Description"
  });
};

app.post("/checkout", async (req, res, next) => {
  console.log("request: ", req.body);
  let status;
  try {
  const {token, order} = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const charge = await stripe.charges.create(
      {
        amount: (order.total * 100).toFixed(0),
        currency: 'usd',
        customer: customer.id,
        description: 'Purchased from Acme Store',

      });
    // console.log('charge:', {charge});
    status ="success"
  } catch (er) {
    // console.log(er);
    status = 'failure'
    res.sendStatus(500);
  }
  res.json({ status});
});

// Page Not Fount Route
app.get("*", (req, res) => {
  res.send(`
    <h1>404 Page Not Found</h1>
    <p>Sorry, that page doesn't exist, Doc. :(</p>
  `);
});

module.exports = app;
