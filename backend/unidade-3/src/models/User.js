const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema do Usuário para o MongoDB via Mongoose.
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
    select: false // Não retorna a senha por padrão nas consultas
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

/**
 * Middleware para hash de senha antes de salvar.
 */
UserSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

/**
 * Método para comparar senhas.
 */
UserSchema.methods.compararSenha = async function(senhaCandidata) {
  return await bcrypt.compare(senhaCandidata, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
