const db = require("../config/database");

// Cadastrar relação livro-editora
const cadastrarRelacaoLivEdit = async function (id_livro, id_editora) {
  try {
    const sql = `
      INSERT INTO LIVRO_TEM_EDITORA (id_livro, id_editora)
      VALUES ($1, $2)
      RETURNING *
    `;
    const valores = [id_livro, id_editora];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar livro-editora:', erro.message, erro.stack);
    throw erro;
  }
};

// Listar todas as relações
const listarRelacoesLivEdit = async function () {
  try {
    const sql = `
      SELECT id_livro, id_editora FROM LIVRO_TEM_EDITORA
    `;
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar livro-editora:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar uma relação
const deletarRelacaoLivEdit = async function (id_livro, id_editora) {
  try {
    const sql = `
      DELETE FROM LIVRO_TEM_EDITORA
      WHERE id_livro = $1 AND id_editora = $2
      RETURNING *
    `;
    const valores = [id_livro, id_editora];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar livro-editora:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarRelacaoLivEdit, listarRelacoesLivEdit, deletarRelacaoLivEdit };
 
 
 

// FEITO
