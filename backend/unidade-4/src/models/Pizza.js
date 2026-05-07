const mongoose = require('mongoose');

/**
 * Modelo de Pizza contendo informações sobre o produto.
 */
const PizzaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  preco: {
    type: Number,
    required: true,
    min: 0
  },
  tamanho: {
    type: String,
    enum: ['Pequena', 'Média', 'Grande', 'Família'],
    default: 'Média'
  },
  disponivel: {
    type: Boolean,
    default: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pizza', PizzaSchema);
