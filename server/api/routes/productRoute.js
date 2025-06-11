const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const productController = require('../controllers/productController');


router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);


router
  .route('/:id')
  .get(productController.getProductById);

  
// File storage
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/createproduct', upload.single('file'), productController.createProduct);
router.get('/getproduct', productController.getAllForms);


module.exports = router;