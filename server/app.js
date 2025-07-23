const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const path = require('path');

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

// Serve static files from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

require('./api/routes')(app);

module.exports = app;