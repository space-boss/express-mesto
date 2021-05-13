const express = require('express');
const { getCards, createCard, deleteCardById } = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/cards', getCards);

cardsRoutes.post('/cards', createCard);

cardsRoutes.delete('/cards/:cardId', deleteCardById);

exports.cardsRoutes = cardsRoutes;