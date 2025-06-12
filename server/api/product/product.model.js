'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: "string", trim: true },
    sellingPrice: Number,
    originalPrice: Number,
    productType: String,
    filePath: String,
    isActive: Boolean
});

module.exports = mongoose.model("Product", productSchema);
