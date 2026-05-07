const User = require('../models/User');

/**
 * Controller de Usuários (Operações protegidas).
 */
class UserController {
  /**
   * Lista todos os usuários.
   */
  async getAll(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  }

  /**
   * Busca um usuário pelo ID.
   */
  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: 'ID inválido' });
    }
  }

  /**
   * Atualiza os dados do usuário logado.
   */
  async update(req, res) {
    try {
      const { nome, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { nome, email },
        { new: true, runValidators: true }
      );

      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Falha na atualização', error: error.message });
    }
  }

  /**
   * Deleta um usuário.
   */
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Falha ao deletar' });
    }
  }
}

module.exports = new UserController();
