const { Cards } = require('../models/Card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Cards.create({ name, link })
  .then(card => res.status(200).send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.deleteCardById = (req, res) => {
  try {
    console.log(req.params.cardId);
    Cards.findOneAndDelete({_id: req.params.cardId}, function (err, card) {
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
