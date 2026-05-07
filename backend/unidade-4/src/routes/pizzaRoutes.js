const { Router } = require('express');
const PizzaController = require('../controllers/PizzaController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = Router();

/**
 * Rotas públicas para visualização de produtos.
 */
router.get('/', PizzaController.getAll);
router.get('/:id', PizzaController.getById);

/**
 * Rotas administrativas protegidas para gerenciamento do catálogo.
 */
router.use(authMiddleware);
router.use(adminMiddleware);

router.post('/', PizzaController.create);
router.put('/:id', PizzaController.update);
router.delete('/:id', PizzaController.delete);

module.exports = router;
