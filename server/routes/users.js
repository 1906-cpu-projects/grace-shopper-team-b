const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('../../db/db');
const hash = require('../../src/utilities/hash');
const { models } = db;
const { Product, User, Order, OrderProducts } = models;

const { check, validationResult } = require('express-validator');

app.get('/', (req, res, next) => {
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

app.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id, {
    attributes: ['username', 'email', 'firstName', 'lastName', 'id']
  })
    .then(users => res.send(users))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
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

// Sign Up

app.post(
  '/',
  [
    check('email', 'A valid email is required...').isEmail(),
    check('password', 'Password is required...')
      .not()
      .isEmpty()
  ],

  async (req, res, next) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: error.array() });
    // }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({
        where: { email }
      });
      if (user) {
        return res.json({
          status: 400,
          msg: 'User already exists...'
        });
      }

      user = new User({
        email,
        password: hash(password)
      });

      await user.save();

      // Return token

      res.send('User registered!');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = app;
