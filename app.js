require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
/*const { celebrate, Joi } = require('celebrate');*/


const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { createUser, login } = require('./controllers/users');
const { usersRoutes } = require('./routes/users.js');
const { cardsRoutes } = require('./routes/cards.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('debug', true);

app.use(express.json());

app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, usersRoutes);
app.use('/', cardsRoutes);

app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
