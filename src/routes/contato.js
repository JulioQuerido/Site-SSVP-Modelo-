const express = require('express');
const contatoController = require('../controllers/contatoController');
const { publicLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.post('/contato', publicLimiter, contatoController.enviar);

module.exports = router;
