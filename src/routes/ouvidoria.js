const express = require('express');
const ouvidoriaController = require('../controllers/ouvidoriaController');
const authenticate = require('../middlewares/authenticate');
const { ouvidoriaLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.post('/ouvidoria', ouvidoriaLimiter, ouvidoriaController.criar);
router.get('/ouvidoria/protocolo/:protocolo', ouvidoriaController.consultarProtocolo);

router.get('/admin/ouvidoria', authenticate, ouvidoriaController.listar);
router.put('/admin/ouvidoria/:id/responder', authenticate, ouvidoriaController.responder);

module.exports = router;
