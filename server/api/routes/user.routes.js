'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// Routes
router.post('/signup', controller.createAccount);
router.post('/login', controller.accountLogin);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password/:token', controller.resetPassword);

module.exports = router;