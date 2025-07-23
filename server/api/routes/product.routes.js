'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/product.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, '../../uploads')); },
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


// Routes
router.post('/createproduct', upload.single('file'), controller.createProduct);
router.get('/getProductDetail/:id', controller.getProductDetail);
router.post('/update', upload.single('file'), controller.updateProduct);
router.get('/getProductList', controller.getAllProducts);
router.post('/getProductListByName', controller.getProductListByName);
router.post('/getProductsByFilter', controller.getProductsByFilter);
router.post('/getProductsCounts', controller.getProductsCounts);


module.exports = router;