const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { usersRoutes } = require('./routes/users.js');

const app = express();

app.use(express.json());
app.use('/', usersRoutes);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})

