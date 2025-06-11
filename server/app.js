const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const productRouter = require('./api/routes/productRoute');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(cors({
  // origin: 'http://localhost:52160',
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/tech', productRouter);
// app.use('/api/v1/users',userRouter);

module.exports = app;