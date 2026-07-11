const express = require('express');
const projetosController = require('../controllers/projetosController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/projetos', projetosController.listar);
router.get('/projetos/:id', projetosController.detalhar);

router.post('/admin/projetos', authenticate, ...upload.single('arquivo'), projetosController.criar);
router.put('/admin/projetos/:id', authenticate, ...upload.single('arquivo'), projetosController.atualizar);
router.delete('/admin/projetos/:id', authenticate, projetosController.remover);

module.exports = router;
