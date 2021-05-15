const express = require('express');
const { getCards, createCard, deleteCardById, likeCard, unlikeCard } = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/cards', getCards);

cardsRoutes.post('/cards', createCard);

cardsRoutes.delete('/cards/:cardId', deleteCardById);

cardsRoutes.put('/cards/:cardId/likes', likeCard);

cardsRoutes.delete('/cards/:cardId/likes', unlikeCard);

exports.cardsRoutes = cardsRoutes;