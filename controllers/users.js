const mongoose = require('mongoose');
const { User } = require('../models/User');
const { handleError } = require('../utils/handleError');

const opts = { runValidators: true, new: true, useFindAndModify: false };

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res, 'NotFound', 404, 'Пользователи не обнаружены'));
};

module.exports.getUserById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    res.status(400).send({ message: 'Формат айди не валиден' });
  } else {
    User.findById(req.params.userId, (err, user) => { // TODO: use err
      if (!user) {
        res.status(400).send({ message: 'Пользователь с данным айди не найден' });
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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).json({
      name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
    }))
    .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные при создании пользователя'));
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.status(200).send({
      name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
    }))
    .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные при обновлении пользователя'));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => res.status(200).send({
      name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
    }))
    .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные при обновлении аватара'));
};
