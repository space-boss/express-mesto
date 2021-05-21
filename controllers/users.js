const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User } = require('../models/User');

const opts = { runValidators: true, new: true, useFindAndModify: false };
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
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
