const { User } = require('../models/User');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
  try {
    User.findById(req.params._id);
    if (user) {
      res.status(200).send({ data: user })
    } else {
      res.status(404).send('Ничего не найдено')
    }
  }
  catch (err) {
    res.status(500).send('Произошла ошибка');
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.status(200).send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
