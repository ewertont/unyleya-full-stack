const express = require('express');
const userRoutes = require('./routes/userRoutes');

/**
 * Configuração da aplicação Express.
 */
const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Health Check' });
});

module.exports = app;
