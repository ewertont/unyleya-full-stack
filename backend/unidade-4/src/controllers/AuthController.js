const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT para o identificador de usuário fornecido.
 * @param {string} id - Identificador único do usuário.
 * @returns {string} Token JWT assinado.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_unyleya', {
    expiresIn: '1d'
  });
};

/**
 * Classe responsável pela autenticação e registro de usuários.
 */
class AuthController {
  /**
   * Realiza o registro de um novo usuário no sistema.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async register(req, res) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'O e-mail informado já está em uso.' });
      }

      const user = await User.create(req.body);
      user.senha = undefined;

      return res.status(201).json({
        user,
        token: generateToken(user._id)
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro no registro do usuário.', error: error.message });
    }
  }

  /**
   * Realiza o registro de um novo administrador no sistema.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async registerAdmin(req, res) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'O e-mail informado já está em uso.' });
      }

      // Força o papel como administrador independente do que vier no body
      const user = await User.create({ ...req.body, role: 'admin' });
      user.senha = undefined;

      return res.status(201).json({
        user,
        token: generateToken(user._id)
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro no registro do administrador.', error: error.message });
    }
  }

  /**
   * Realiza a autenticação do usuário e retorna o token de acesso.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await User.findOne({ email }).select('+senha');

      if (!user || !(await user.compararSenha(senha))) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      user.senha = undefined;
      return res.json({
        user,
        token: generateToken(user._id)
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro ao processar o login.', error: error.message });
    }
  }
}

module.exports = new AuthController();
