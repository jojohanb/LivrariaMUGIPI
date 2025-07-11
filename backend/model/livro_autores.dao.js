const db = require("../config/database");

// Cadastrar relação entre livro e autor
const cadastrarRelacaoAutLiv = async function (id_livro, id_autor) {
  try {
    const sql = 'INSERT INTO LIVRO_AUTORES (id_livro, id_autor) VALUES ($1, $2) RETURNING *';
    const valores = [id_livro, id_autor];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar relação livro-autor:', erro.message, erro.stack);
    throw erro;
  }
};

// Listar todas as relações livro-autor
const listarRelacoesAutLiv = async function () {
  try {
    const sql = 'SELECT id_livro, id_autor FROM LIVRO_AUTORES';
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar relações livro-autor:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar relação entre livro e autor
const deletarRelacaoAutLiv = async function (id_livro, id_autor) {
  try {
    const sql = 'DELETE FROM LIVRO_AUTORES WHERE id_livro = $1 AND id_autor = $2 RETURNING *';
    const valores = [id_livro, id_autor];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar relação livro-autor:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarRelacaoAutLiv, listarRelacoesAutLiv, deletarRelacaoAutLiv };

// FEITO
