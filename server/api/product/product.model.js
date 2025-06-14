'use strict';

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: "string", trim: true },
    sellingPrice: Number,
    originalPrice: Number,
    productType: String,
    filePath: String,
    count: { type: Number, default: 1 },
    isActive: Boolean
});

module.exports = mongoose.model("Product", productSchema);
