const { Cards } = require('../models/Card');
const { handleError } = require('../utils/handleError');

module.exports.getCards = (req, res) => {
  Cards.find({})
  .populate(['owner'])
  .then(cards => res.status(200).send({ data: cards }))
  .catch((err) => handleError(err, res, 'NotFound', 404, 'Карточки не найдены'));
};


module.exports.createCard = (req, res) => {
  const { name, link, ownerId, likes } = req.body;

  Cards.create({ name, link, owner: ownerId, likes })
  .then(card => res.status(200).json({"name": card.name, "link": card.link, "_id": card._id, "owner": card.owner, "likes": [] }))
  .catch((err) => handleError(err, res, 'ValidationError', 400, 'При создании карточки переданы некорректные данные'));
};


module.exports.deleteCardById = (req, res) => {
  Cards.findOneAndDelete({_id: req.params.cardId}, function (err) {
    if (!err) {
      res.status(200).send({message: "Card is deleted"});
    }
    else {
      handleError(err, res, 'NotFound', 404, 'Карточка с указанным _id не найдена')
    }
  });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate (
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.status(200).send({ data: card }))
  .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные для постановки лайка'));
};

module.exports.unlikeCard = (req, res) => {
  Cards.findByIdAndUpdate (
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.status(200).send({ data: card }))
  .catch((err) => handleError(err, res, 'ValidationError', 400, 'Переданы некорректные данные для снятия лайка'));
};