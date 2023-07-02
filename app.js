const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { errorHandlerUsers } = require('./controllers/users');
const { errorHandlerCards } = require('./controllers/cards');
const { PORT, ERROR_CODE_NOT_FOUND } = require('./utils/constants');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649dd720d7e815077847b906',
  };
  next();
});
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('/users', errorHandlerUsers);
app.use('/cards', errorHandlerCards);
app.use((req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Путь не существует' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT, () => {
});
