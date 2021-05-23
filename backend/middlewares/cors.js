const cors = require('cors');

const allowedCors = [
  'http://spaceboss.mesto.nomoredomains.club',
  'https://spaceboss.mesto.nomoredomains.club',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  alowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}

module.exports = cors(corsOptions);