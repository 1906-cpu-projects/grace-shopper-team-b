const express = require('express');

const path = require('path');

const app = express();

const db = require('./db');
const { models } = require('./db');
const { User, Product } = models;

const Sequelize = require('sequelize');



//ISSUES WITH WEBPACK - COMMENTING OUT THE BELOW
//app.use(express.json());
//app.use('/dist', express.static(path.join(__dirname, '../dist')));

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/api/products', (req, res, next) => {
  Product.findAll()
  .then(products => res.send(products))
  .catch(next)
});



//db.syncAndSeed()
//.then(() => {
app.listen(port, ()=> console.log(`listening on port ${port}`))
//});
