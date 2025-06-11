'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "Please type your product name"],
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price;
            },
            message: 'price discount should lesser than the price'
        },
    },
    productType: {
        type: String,
        required: [true, "A Product must have a type"],
        enum: {
            values: ["processor", "ram", "mouse", "motheboard"],
            message: "Product type is either :processor, ram, mouse,motheboard",
        },
    },
    filePath: String
});

module.exports = mongoose.model("Product", productSchema);
