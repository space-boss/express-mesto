const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { usersRoutes } = require('./routes/users.js');
const { cardsRoutes } = require('./routes/cards.js');
mongoose.set('debug', true);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6099934d74a7f219603f613c'
  };
  next();
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.use('/', usersRoutes);

app.use('/', cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
