const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(cors({
  origin: 'https://tech-byte-chennai.vercel.app',
  // origin: 'http://localhost:4200',
  credentials: true
}));

require('./routes')(app);

module.exports = app;