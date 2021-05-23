const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

const validateUrl = (value, helpers) => {
  if (!isURL(value, { require_protocol: true })) {
    return helpers.message('В данном поле допустимы только валидные ссылки');
  }
  return value;
};

cardsRoutes.get('/cards', getCards);

cardsRoutes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl, 'Ссылка не валидна'),
  }),
}), createCard);

cardsRoutes.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
}), deleteCardById);

cardsRoutes.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
}), likeCard);

cardsRoutes.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
}), unlikeCard);

exports.cardsRoutes = cardsRoutes;
