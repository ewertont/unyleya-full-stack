require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

/**
 * Inicializa a conexão com o banco de dados.
 */
connectDB();

/**
 * Middlewares globais.
 */
app.use(express.json());

/**
 * Definição das rotas da API.
 */
app.use('/auth', authRoutes);
app.use('/pizzas', pizzaRoutes);
app.use('/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    mensagem: 'API da Pizzaria Unyleya.',
  });
});

module.exports = app;
