const { User } = require('../models/User');
const { handleError } = require('../utils/handleError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res, 'NotFound', 404, 'Пользователи не обнаружены'));
  };

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId, function (err, user) {
    if (!err) {
      res.status(200).json({"name": user.name, "about": user.about, "avatar": user.avatar, "_id": user._id})
    }
    else {
      handleError(err, res, 'NotFound', 404, 'Пользователь с указанным _id не найден')
    }
  });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.status(200).json({"name": user.name, "about": user.about, "avatar": user.avatar, "_id": user._id}))
  .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные при создании пользователя'));
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about },  { new: true })
  .then(user => res.status(200).send({"name": user.name, "about": user.about, "avatar": user.avatar, "_id": user._id}))
  .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные при обновлении пользователя'));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar },  { new: true })
  .then(user => res.status(200).send({"name": user.name, "about": user.about, "avatar": user.avatar, "_id": user._id}))
  .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные при обновлении аватара'));
};