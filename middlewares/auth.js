const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authentication-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError('У пользователя нет доступа');
  }

  req.user = payload;

  next();
};
