const mongoose = require('mongoose');
const { User } = require('../models/User');

const opts = { runValidators: true, new: true, useFindAndModify: false };

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

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(200).json({
      name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'При создании пользователя переданы некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
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
