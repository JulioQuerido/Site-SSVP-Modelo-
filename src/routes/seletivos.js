const express = require('express');
const seletivosController = require('../controllers/seletivosController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

const uploadCampos = upload.fields([
  { name: 'edital', maxCount: 1 },
  { name: 'resultado', maxCount: 1 },
]);

router.get('/seletivos', seletivosController.listar);

router.get('/admin/seletivos', authenticate, seletivosController.listar);
router.post('/admin/seletivos', authenticate, ...uploadCampos, seletivosController.criar);
router.put('/admin/seletivos/:id', authenticate, ...uploadCampos, seletivosController.atualizar);

module.exports = router;
