const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
  errors,
  celebrate,
} = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { errorHandlerUsers } = require('./controllers/users');
const { errorHandlerCards } = require('./controllers/cards');
const { login, createUser } = require('./controllers/users');
const { PORT, ERROR_CODE_NOT_FOUND, USER_VALIDATION_OBJECT } = require('./utils/constants');
const auth = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());
app.post('/signin', celebrate(USER_VALIDATION_OBJECT), login);
app.post('/signup', celebrate(USER_VALIDATION_OBJECT), createUser);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use(errors);
app.use('/signin', errorHandlerUsers);
app.use('/signup', errorHandlerUsers);
app.use('/users', errorHandlerUsers);
app.use('/cards', errorHandlerCards);
app.use((req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Путь не существует' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT, () => {
});
