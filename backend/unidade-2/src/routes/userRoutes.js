const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

/**
 * Rotas de Usuários
 */
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
