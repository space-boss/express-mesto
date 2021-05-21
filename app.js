require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { createUser, login } = require('./controllers/users');
const { usersRoutes } = require('./routes/users.js');
const { cardsRoutes } = require('./routes/cards.js');

mongoose.set('debug', true);

app.use(express.json());

app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, usersRoutes);
app.use('/', cardsRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
