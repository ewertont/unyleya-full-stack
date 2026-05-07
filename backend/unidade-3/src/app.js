require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Conecta ao Banco de Dados
connectDB();

// Middlewares
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Health Check' });
});

module.exports = app;
