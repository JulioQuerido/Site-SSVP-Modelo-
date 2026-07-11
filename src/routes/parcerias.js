const express = require('express');
const parceriasController = require('../controllers/parceriasController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/parcerias', parceriasController.listar);

router.post('/admin/parcerias', authenticate, ...upload.single('arquivo'), parceriasController.criar);
router.put('/admin/parcerias/:id', authenticate, ...upload.single('arquivo'), parceriasController.atualizar);
router.delete('/admin/parcerias/:id', authenticate, parceriasController.remover);

module.exports = router;
