const express = require('express');
const indicadoresController = require('../controllers/indicadoresController');

const router = express.Router();

router.get('/indicadores', indicadoresController.indicadores);

module.exports = router;
