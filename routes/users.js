const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const {
  getUsers, getUserById, updateUserProfile, updateAvatar, getCurrentProfile,
} = require('../controllers/users');

const usersRoutes = express.Router();

const validateUrl = (value, helpers) => {
  if (!isURL(value, { require_protocol: true })) {
    return helpers.message('В данном поле допустимы только валидные ссылки');
  }
  return value;
};

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/me', getCurrentProfile);

usersRoutes.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }).unknown(true),
}), getUserById);

usersRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserProfile);

usersRoutes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl, 'Ссылка не валидна'),
  }),
}), updateAvatar);

exports.usersRoutes = usersRoutes;
