const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const BadRequestError = require('../errors/bad-request-err');
const ValidationError = require('../errors/validation-err');
const AuthorizationError = require('../errors/authorization-err');
const NotFoundError = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const opts = { runValidators: true, new: true, useFindAndModify: false };
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      throw new ValidationError('Формат _id не валиден');
    } else {
      const user = await User.findById(req.params.userId)
        .orFail(new NotFoundError('Пользователь с данным _id не найден'));
      res.status(200).json(
        {
          name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        },
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(new NotFoundError('Пользователь с данным _id не найден'));
    res.status(200).json(
      {
        name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      },
    );
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('Не передан email или пароль');
  }
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, password: hash });
    res.status(200).send({ message: 'Пользователь успешно создан' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные'));
      return;
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ValidationError('Данный email уже зарегистрирован'));
      return;
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('Не передан email или пароль');
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('Неверные почта или пароль');
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new AuthorizationError('Неверные почта или пароль');
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.cookie('userToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
    }).send({ _id: user._id });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  const { _id, name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, { name, about }, opts)
      .orFail(new NotFoundError('Запрашиваемый профиль не найден'));
    res.status(200).json(
      {
        name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      },
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('При обновлении профиля переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { _id, avatar } = req.body;
  try {
    const user = User.findByIdAndUpdate(_id, { avatar }, opts)
      .orFail(new NotFoundError('Запрашиваемый профиль не найден'));
    res.status(200).json(
      {
        name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      },
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('При обновлении аватара переданы некорректные данные'));
      return;
    }
    next(err);
  }
};
