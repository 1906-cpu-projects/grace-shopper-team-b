const express = require('express');

const path = require('path');

const app = express();

//const db = require('./db');

const Sequelize = require('sequelize');



//app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'))
})




//db.syncAndSeed()
//.then(() => {
app.listen(port, ()=> console.log(`listening on port ${port}`))
//});
