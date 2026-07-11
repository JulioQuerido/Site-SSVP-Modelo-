const express = require('express');
const documentosController = require('../controllers/documentosController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/documentos', documentosController.listar);

router.post('/admin/documentos', authenticate, ...upload.single('arquivo'), documentosController.criar);
router.put('/admin/documentos/:id', authenticate, ...upload.single('arquivo'), documentosController.atualizar);
router.delete('/admin/documentos/:id', authenticate, documentosController.remover);

module.exports = router;
