const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { errorHandlerUsers } = require('./controllers/users');
const { errorHandlerCards } = require('./controllers/cards');
const { login, createUser } = require('./controllers/users');
const { PORT, ERROR_CODE_NOT_FOUND } = require('./utils/constants');
const auth = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/signin', errorHandlerUsers);
app.use('/signup', errorHandlerUsers);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/users', errorHandlerUsers);
app.use('/cards', cardsRoutes);
app.use('/cards', errorHandlerCards);
app.use((req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Путь не существует' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT, () => {
});
