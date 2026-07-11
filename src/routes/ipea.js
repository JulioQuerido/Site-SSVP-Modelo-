const express = require('express');
const ipeaController = require('../controllers/ipeaController');

const router = express.Router();

router.get('/ipea/ficha', ipeaController.ficha);

module.exports = router;
