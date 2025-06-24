'use strict';
const express = require('express');
const path = require('path');
const productRoutes = require('./product.routes');
const userRoutes = require('./user.routes');

module.exports = function (app) {

  /*Insert Node routes below*/
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/api/product', productRoutes);
  app.use('/api/user', userRoutes);
};
