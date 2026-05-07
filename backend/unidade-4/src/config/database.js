const mongoose = require('mongoose');

/**
 * Realiza a conexão com o banco de dados MongoDB utilizando a URI fornecida no ambiente.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/unyleya_pizzaria';
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro na conexão com o MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
