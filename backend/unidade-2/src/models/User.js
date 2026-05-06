/**
 * Representa a estrutura de um Usuário no sistema.
 */
class User {
  /**
   * @param {string} id - Identificador único
   * @param {string} nome - Nome do usuário
   * @param {string} email - E-mail do usuário
   * @param {string} senha - Senha do usuário
   */
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.criadoEm = new Date();
  }
}

module.exports = User;
