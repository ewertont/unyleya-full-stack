const mongoose = require('mongoose');

/**
 * Modelo de Pedido vinculado a um usuário e uma lista de itens.
 */
const OrderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itens: [{
    pizza: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pizza',
      required: true
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1
    },
    precoUnitario: {
      type: Number,
      required: true
    }
  }],
  valorTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pendente', 'Em Preparo', 'Em Rota', 'Entregue', 'Cancelado'],
    default: 'Pendente'
  },
  dataPedido: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
