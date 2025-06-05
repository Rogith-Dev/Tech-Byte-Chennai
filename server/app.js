const express = require('express');
const morgan = require('morgan');
const app = express();
const productRouter=require('./api/routes/productRoute');

if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1/tech',productRouter);
// app.use('/api/v1/users',userRouter);
module.exports = app;