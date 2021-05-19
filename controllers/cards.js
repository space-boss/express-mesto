const mongoose = require('mongoose');
const { Cards } = require('../models/Card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.find({}).populate(['owner']);
    res.status(200).send({ data: cards });
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const {
      name, link, ownerId, likes,
    } = req.body;
    const card = await Cards.create({
      name, link, owner: ownerId, likes,
    });
    res.status(200).json({
      name: card.name, link: card.link, _id: card._id, owner: card.owner, likes: [],
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'При создании карточки переданы некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.deleteCardById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.cardId)) {
    res.status(400).send({ message: 'Формат _id не валиден' });
  } else {
    Cards.findOneAndDelete({ _id: req.params.cardId }, (err, card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с данным _id не найдена' });
      } else {
        res.status(200).send({ message: 'Карточка успешно удалена' });
      }
    });
  }
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    (err, card) => {
      if (err) {
        res.status(400).send({ message: 'При постановке лайка переданы некорректные данные' });
      } else if (!card) {
        res.status(404).send({ message: 'Карточка с данным _id не найдена' });
      } else {
        res.status(200).json(
          { data: card },
        );
      }
    },
  );
};

module.exports.unlikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
    (err, card) => {
      if (err) {
        res.status(400).send({ message: 'При постановке лайка переданы некорректные данные' });
      } else if (!card) {
        res.status(404).send({ message: 'Карточка с данным _id не найдена' });
      } else {
        res.status(200).json(
          { data: card },
        );
      }
    },
  );
};
