const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const db = require('./db');
const { models } = require('./db');
const { Product, User, Guest } = models;

// Setups for express-sessions
// const TWO_HOURS = 1000 * 60 * 60 * 2;

// const {
//   NODE_ENV = 'development',

//   SESS_NAME = 'sid',
//   SESS_SECRET = 'placeholder for secret',
//   SESS_LIFETIME = TWO_HOURS
// } = process.env;

// const IN_PROD = NODE_ENV === 'production';

const Sequelize = require('sequelize');

//ISSUES WITH WEBPACK - COMMENTING OUT THE BELOW
//app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.use(
//   session({
//     name: SESS_NAME,
//     resave: false,
//     saveUninitialized: false,
//     secret: SESS_SECRET,
//     cookie: {
//       maxAge: SESS_LIFETIME,
//       sameSite: true,
//       secure: IN_PROD
//     }
//   })
// );

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals.user = users.find(user => user.id === userId);
  }
  next();
});

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

// // Login

// // Check if visitor is logged in
// const redirectLogin = (req, res, next) => {
//   if (!req.session.userId) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

// const redirectHome = (req, res, next) => {
//   if (req.session.userId) {
//     res.redirect('/home');
//   } else {
//     next();
//   }
// };

// app.post('/login', redirectHome, (req, res) => {
//   // const  { email, password } = req.body;

//   if (req.body.email && req.body.password) {
//     const user = users.find(
//       user =>
//         user.email === req.body.email && user.password === req.body.password
//     );

//     // if user is found
//     if (user) {
//       // create session id cookie
//       req.session.userId = user.id;
//       // direct logged in user to the home/dashboard page
//       return res.redirect('/home');
//     }
//   }
// });

// // Logout

// app.post('/logout', redirectLogin, (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       return res.redirect('/home');
//     }

//     res.clearCookie(SESS_NAME);
//     res.redirect('/login');
//   });
// });

db.syncAndSeed().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});

module.exports = app;
