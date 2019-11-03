const express = require('express');
const path = require('path');
const app = express();
const db = require('../db/db');

app.use('/api', require('./api'));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/css', express.static(path.join(__dirname, '../css')));


app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 3000;

db.syncAndSeed().then(() => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});


