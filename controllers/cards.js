const mongoose = require('mongoose');
const { Cards } = require('../models/Card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ValidationError = require('../errors/validation-err');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Cards.find({});
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const {
      name, link, likes,
    } = req.body;
    const ownerId = new mongoose.Types.ObjectId(req.user._id);
    const card = await Cards.create({
      name, link, owner: ownerId, likes,
    });
    res.status(200).json({
      name: card.name, link: card.link, _id: card._id, owner: card.owner, likes: [],
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('При создании карточки переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.cardId)) {
      throw new ValidationError('Формат _id не валиден');
    } else {
      const card = await Cards.findById(req.params.cardId)
        .orFail(new NotFoundError('Данная карточка не найдена'));
      if (card.owner.toString() !== req.user._id) {
        throw new BadRequestError('У вас нет прав для удаления данной карточки');
      } else {
        console.log('hallo');
        const cardWithId = await Cards.findByIdAndDelete(req.params.cardId)
          .orFail(new NotFoundError('Карточка с данным _id не найдена'));
        res.status(200).send(cardWithId);
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const likedCard = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new NotFoundError('Карточка с данным _id не найдена'));
    res.status(200).json({ data: likedCard });
  } catch (err) {
    next(err);
  }
};

module.exports.unlikeCard = async (req, res, next) => {
  try {
    const unlikedCard = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new NotFoundError('Карточка с данным _id не найдена'));
    res.status(200).json({ data: unlikedCard });
  } catch (err) {
    next(err);
  }
};
