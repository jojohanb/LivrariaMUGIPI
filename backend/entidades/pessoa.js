class Pessoa {
  constructor(ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha) {
    this.ra_pessoa = ra_pessoa;
    this.tipo_id = tipo_id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.data_nascimento = data_nascimento;
    this.login = login;
    this.senha = senha;
  }
}

module.exports = Pessoa;
//FEITO