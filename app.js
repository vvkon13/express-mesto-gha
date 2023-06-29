const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use((req, res, next) => {
  req.user = {
    _id: '649dd720d7e815077847b906',
  };
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(3000, () => {
  console.log('Ok');
});
