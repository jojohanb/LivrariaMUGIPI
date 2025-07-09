const db = require("../config/database");

// Cadastrar pessoa
const cadastrarPessoa = async function (ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha) {
  try {
    const sql = 'INSERT INTO pessoa (ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const valores = [ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

// Listar pessoas
const listarPessoa = async function () {
  const sql = 'SELECT ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login FROM pessoa';
  try {
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar pessoas:', erro.message, erro.stack);
    throw erro;
  }
};

// Atualizar pessoa
const atualizarPessoa = async function (ra_pessoa, nome, email, telefone, data_nascimento, login, senha) {
  try {
    const sql = 'UPDATE pessoa SET nome = $1, email = $2, telefone = $3, data_nascimento = $4, login = $5, senha = $6 WHERE ra_pessoa = $7 RETURNING *';
    const valores = [nome, email, telefone, data_nascimento, login, senha, ra_pessoa];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar pessoa
const deletarPessoa = async function (ra_pessoa) {
  try {
    const sql = 'DELETE FROM pessoa WHERE ra_pessoa = $1 RETURNING *';
    const valores = [ra_pessoa];
    const resultado = await db.query(sql, valores);
    if (resultado.rowCount === 0) return null;
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarPessoa, listarPessoa, atualizarPessoa, deletarPessoa }; 
//Exporta as funcionalidades
//FEITO 