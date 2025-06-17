'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

// Routes
router.post('/signup', controller.createAccount);
router.post('/login', controller.accountLogin)

module.exports = router;