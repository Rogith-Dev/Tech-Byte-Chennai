'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: "string", trim: true },
    price: Number,
    priceDiscount: Number,
    productType: String,
    filePath: String
});

module.exports = mongoose.model("Product", productSchema);
