const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT para o usuário.
 * @param {string} id - ID do usuário
 * @returns {string}
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_unyleya', {
    expiresIn: '1d'
  });
};

/**
 * Controller de Autenticação.
 */
class AuthController {
  /**
   * Registra um novo usuário.
   */
  async register(req, res) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      const user = await User.create(req.body);
      user.senha = undefined; // Remove a senha da resposta

      return res.status(201).json({
        user,
        token: generateToken(user.id)
      });
    } catch (error) {
      return res.status(400).json({ message: 'Falha no registro', error: error.message });
    }
  }

  /**
   * Realiza o login do usuário.
   */
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ email }).select('+senha');

      if (!user || !(await user.compararSenha(senha))) {
        return res.status(401).json({ message: 'E-mail ou senha inválidos' });
      }

      user.senha = undefined;

      return res.json({
        user,
        token: generateToken(user.id)
      });
    } catch (error) {
      return res.status(400).json({ message: 'Falha no login', error: error.message });
    }
  }
}

module.exports = new AuthController();
