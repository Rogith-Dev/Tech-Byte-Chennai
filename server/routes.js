'use strict';

module.exports = function (app) {

  /*Insert Node routes below*/
  app.use('/api/product', require('./api/product'));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
};
