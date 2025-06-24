const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// origin: ['https://tech-byte-chennai.vercel.app'], // Replace with your frontend origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

require('./api/routes')(app);

module.exports = app;