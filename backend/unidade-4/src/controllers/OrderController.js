const Order = require('../models/Order');
const Pizza = require('../models/Pizza');

/**
 * Classe responsável pelo processamento de pedidos na pizzaria.
 */
class OrderController {
  /**
   * Cria um novo pedido vinculado ao usuário autenticado.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async create(req, res) {
    try {
      const { itens } = req.body;
      let valorTotal = 0;

      // Validação e cálculo do valor total
      const orderItems = await Promise.all(itens.map(async (item) => {
        const pizza = await Pizza.findById(item.pizza);
        if (!pizza) throw new Error(`Pizza com ID ${item.pizza} não encontrada.`);
        
        const subtotal = pizza.preco * item.quantidade;
        valorTotal += subtotal;

        return {
          pizza: pizza._id,
          quantidade: item.quantidade,
          precoUnitario: pizza.preco
        };
      }));

      const order = await Order.create({
        usuario: req.userId,
        itens: orderItems,
        valorTotal
      });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao processar o pedido.', error: error.message });
    }
  }

  /**
   * Lista o histórico de pedidos do usuário autenticado.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async getMyOrders(req, res) {
    try {
      const orders = await Order.find({ usuario: req.userId })
        .populate('itens.pizza', 'nome preco')
        .sort('-dataPedido');
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar o histórico de pedidos.' });
    }
  }

  /**
   * Busca os detalhes de um pedido específico pelo identificador.
   * Verifica se o pedido pertence ao usuário autenticado.
   * @param {import('express').Request} req - Objeto de requisição.
   * @param {import('express').Response} res - Objeto de resposta.
   */
  async getById(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate('itens.pizza', 'nome preco descricao');

      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }

      // Verifica se o pedido pertence ao usuário logado
      if (order.usuario.toString() !== req.userId) {
        return res.status(403).json({ message: 'Acesso negado a este pedido.' });
      }

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ message: 'Identificador de pedido inválido.' });
    }
  }
}

module.exports = new OrderController();
