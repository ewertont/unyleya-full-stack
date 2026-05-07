const User = require('../models/User');

/**
 * Middleware que valida se o usuário autenticado possui perfil de administrador.
 * Deve ser utilizado após o authMiddleware.
 * @param {import('express').Request} req - Objeto de requisição.
 * @param {import('express').Response} res - Objeto de resposta.
 * @param {import('express').NextFunction} next - Próxima função.
 */
module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Acesso negado. Esta operação exige privilégios de administrador.' 
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao validar permissões de administrador.' });
  }
};
