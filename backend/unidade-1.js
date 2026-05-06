/**
 * Representa um Usuário no sistema com atributos e métodos.
 */
class Usuario {
  /**
   * @param {string} nome - Nome completo do usuário
   * @param {string} dataNascimento - Data de nascimento (formato DD-MM-YYYY)
   * @param {string} email - Endereço de e-mail válido
   * @param {string} senha - Senha de acesso
   */
  constructor(nome, dataNascimento, email, senha) {
    this.id = crypto.randomUUID();
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.senha = senha;
    this.ativo = true;
    this.criadoEm = new Date();
  }

  /**
   * Retorna o objeto Usuário.
   * @returns {string}
   */
  apresentar() {
    return `Usuário: ${this.nome} | E-mail: ${this.email} | Data de Nascimento: ${this.dataNascimento}`;
  }
}

const user = new Usuario('Ewerton Bezerra', '16-04-1994', 'ewerton@exemplo.com.br', 'mudar123');

console.log(user.apresentar());
