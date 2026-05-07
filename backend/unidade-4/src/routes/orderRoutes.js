const { Router } = require('express');
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

/**
 * Todas as rotas de pedidos exigem autenticação.
 */
router.use(authMiddleware);

/**
 * Rota para submissão de um novo pedido.
 */
router.post('/', OrderController.create);

/**
 * Rota para listagem do histórico de pedidos do usuário logado.
 */
router.get('/me', OrderController.getMyOrders);

/**
 * Rota para buscar os detalhes de um pedido específico.
 */
router.get('/:id', OrderController.getById);

module.exports = router;
