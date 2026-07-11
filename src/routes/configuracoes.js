const express = require('express');
const configuracoesController = require('../controllers/configuracoesController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/admin/configuracoes', authenticate, configuracoesController.listar);
router.put('/admin/configuracoes', authenticate, configuracoesController.atualizar);

module.exports = router;
