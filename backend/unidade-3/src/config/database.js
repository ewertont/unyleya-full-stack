const mongoose = require('mongoose');

/**
 * Configura e inicia a conexão com o banco de dados MongoDB.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/unyleya_fullstack';

    await mongoose.connect(mongoURI);

    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
