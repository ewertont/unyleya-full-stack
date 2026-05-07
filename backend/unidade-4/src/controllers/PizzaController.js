const Pizza = require('../models/Pizza');

/**
 * Classe responsável pelo gerenciamento do catálogo de pizzas.
 */
class PizzaController {
  /**
   * Lista todas as pizzas cadastradas no sistema.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async getAll(req, res) {
    try {
      const pizzas = await Pizza.find({ disponivel: true });
      return res.json(pizzas);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar o catálogo de pizzas.' });
    }
  }

  /**
   * Busca os detalhes de uma pizza específica pelo ID.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async getById(req, res) {
    try {
      const pizza = await Pizza.findById(req.params.id);
      if (!pizza) {
        return res.status(404).json({ message: 'Pizza não encontrada.' });
      }
      return res.json(pizza);
    } catch (error) {
      return res.status(400).json({ message: 'Identificador de pizza inválido.' });
    }
  }

  /**
   * Cria um novo cadastro de pizza no sistema.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async create(req, res) {
    try {
      const pizza = await Pizza.create(req.body);
      return res.status(201).json(pizza);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar a pizza.', error: error.message });
    }
  }

  /**
   * Atualiza as informações de uma pizza existente.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async update(req, res) {
    try {
      const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!pizza) {
        return res.status(404).json({ message: 'Pizza não encontrada.' });
      }
      return res.json(pizza);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar os dados da pizza.' });
    }
  }

  /**
   * Remove o cadastro de uma pizza do sistema.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async delete(req, res) {
    try {
      const pizza = await Pizza.findByIdAndDelete(req.params.id);
      if (!pizza) {
        return res.status(404).json({ message: 'Pizza não encontrada.' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao remover a pizza.' });
    }
  }
}

module.exports = new PizzaController();
