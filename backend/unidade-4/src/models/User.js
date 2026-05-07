const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Modelo de Usuário para autenticação no sistema de pizzaria.
 */
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

/**
 * Hook executado antes de salvar o usuário para criptografar a senha.
 */
UserSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

/**
 * Compara a senha fornecida com o hash armazenado no banco de dados.
 * @param {string} senhaCandidata - Senha em texto plano.
 * @returns {Promise<boolean>}
 */
UserSchema.methods.compararSenha = async function(senhaCandidata) {
  return await bcrypt.compare(senhaCandidata, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
