const User = require('../models/User');
const crypto = require('crypto');

/**
 * Armazenamento em memória para os usuários.
 * @type {User[]}
 */
let users = [];

/**
 * Controller responsável pelas operações de CRUD de Usuários.
 */
class UserController {
  /**
   * Lista todos os usuários.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  getAll(req, res) {
    res.json(users);
  }

  /**
   * Busca um usuário pelo ID.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  getById(req, res) {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  }

  /**
   * Cria um novo usuário.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  create(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
    }

    const newUser = new User(
      crypto.randomUUID(),
      nome,
      email,
      senha
    );

    users.push(newUser);
    res.status(201).json(newUser);
  }

  /**
   * Atualiza um usuário existente.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  update(req, res) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const updatedUser = {
      ...users[userIndex],
      nome: nome || users[userIndex].nome,
      email: email || users[userIndex].email,
      senha: senha || users[userIndex].senha
    };

    users[userIndex] = updatedUser;
    res.json(updatedUser);
  }

  /**
   * Remove um usuário.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  delete(req, res) {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  }
}

module.exports = new UserController();
