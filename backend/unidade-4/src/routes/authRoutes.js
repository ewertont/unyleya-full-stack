const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

/**
 * Rota para registro de novos usuários.
 */
router.post('/register', AuthController.register);

/**
 * Rota para registro de administradores.
 */
router.post('/register-admin', AuthController.registerAdmin);

/**
 * Rota para autenticação de usuários existentes.
 */
router.post('/login', AuthController.login);

module.exports = router;
