const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

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

module.exports.getUserById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    res.status(400).send({ message: 'Формат _id не валиден' });
  } else {
    User.findById(req.params.userId, (err, user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь с данным _id не найден' });
      } else {
        res.status(200).json(
          {
            name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
          },
        );
      }
    });
  }
};

module.exports.getCurrentProfile = async (req, res, next) => {
  await User.findById(req.user._id, (err, user) => {
    if (!user) {
      res.status(404).send({ message: 'Пользователь с данным _id не найден' });
    } else {
      res.status(200).json(
        {
          name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        },
      );
    }
  });
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Не передан email или пароль' });
  }
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ email, password: hash }))
    .then((createdUser) => {
      res.status(200).send({ message: 'Пользователь успешно создан' });
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return res.status(409).send({ message: 'Пользователь с данным email уже существует' });
      }
      return res.status(500).send(err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Не передан email или пароль' });
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.cookie('userToken', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: true,
          })
            .send({ _id: user._id });
        })
        .catch((err) => {
          res.status(401).send({ message: 'Вход не авторизован' });
        });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports.updateUserProfile = (req, res) => {
  const { _id, name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, opts, (err, user) => {
    if (err) {
      res.status(400).send({ message: 'При обновлении профиля переданы некорректные данные' });
    } else if (!user) {
      res.status(404).send({ message: 'Пользователь с данным _id не найден' });
    } else {
      res.status(200).json(
        {
          name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        },
      );
    }
  });
};

module.exports.updateAvatar = (req, res) => {
  const { _id, avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, opts, (err, user) => {
    if (err) {
      res.status(400).send({ message: 'При обновлении аватара переданы некорректные данные' });
    } else if (!user) {
      res.status(404).send({ message: 'Пользователь с данным _id не найден' });
    } else {
      res.status(200).json(
        {
          name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        },
      );
    }
  });
};
