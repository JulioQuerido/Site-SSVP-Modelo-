const express = require('express');
const authController = require('../controllers/authController');
const { loginLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.post('/auth/login', loginLimiter, authController.login);
router.post('/auth/refresh', authController.refresh);
router.post('/auth/logout', authController.logout);

module.exports = router;
