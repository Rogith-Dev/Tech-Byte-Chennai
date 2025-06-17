'use strict';
const express = require('express');
const path = require('path');

module.exports = function (app) {

  /*Insert Node routes below*/
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/api/product', require('./api/product'));
  app.use('/api/user', require('./api/user'));
};
