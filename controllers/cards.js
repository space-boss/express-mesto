const { Cards } = require('../models/Card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .populate(['owner'])
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.createCard = (req, res) => {
  const { name, link, ownerId, likes } = req.body;

  Cards.create({ name, link, owner: ownerId, likes })
  .then(card => res.status(200).send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.deleteCardById = (req, res) => {
  try {
    Cards.findOneAndDelete({_id: req.params.cardId}, function (err) {
      if (err){
        console.log(err);
      }
      else{
        console.log("Deleted Card : ", req.params.cardId);
        res.status(200).send({message: "Card is deleted"});
      }
    });
  }
  catch (err) {
    res.status(500).send(err);
  }
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate (
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.status(200).send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.unlikeCard = (req, res) => {
  Cards.findByIdAndUpdate (
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.status(200).send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};