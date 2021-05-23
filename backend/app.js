/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {
  celebrate, Joi, isCelebrateError, CelebrateError,
} = require('celebrate');
const { errors } = require('celebrate');
const { isURL } = require('validator');

const auth = require('./middlewares/auth');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { createUser, login } = require('./controllers/users');
const { usersRoutes } = require('./routes/users.js');
const { cardsRoutes } = require('./routes/cards.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const ValidationError = require('./errors/validation-err');
const NotFoundError = require('./errors/not-found-err');

mongoose.set('debug', true);

app.use(express.json());

app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const validateUrl = (value, helpers) => {
  if (!isURL(value, { require_protocol: true })) {
    return helpers.message('В данном поле допустимы только валидные ссылки');
  }
  return value;
};

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    avatar: Joi.string().custom(validateUrl, 'Ссылка не валидна').default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }),
}), createUser);

app.use('/', auth, usersRoutes);
app.use('/', cardsRoutes);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    throw new ValidationError(errorBody.details[0].message);
  } else {
    const { statusCode = 500, message } = err;

    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
