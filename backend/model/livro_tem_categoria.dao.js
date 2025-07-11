const db = require("../config/database");

// Cadastrar relação livro-categoria
const cadastrarRelacaoLivCat = async function (id_livro, id_categoria) {
  try {
    const sql = `
      INSERT INTO LIVRO_TEM_CATEGORIA (id_livro, id_categoria)
      VALUES ($1, $2)
      RETURNING *
    `;
    const valores = [id_livro, id_categoria];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar livro-categoria:', erro.message, erro.stack);
    throw erro;
  }
};

// Listar todas as relações
const listarRelacoesLivCat = async function () {
  try {
    const sql = `SELECT id_livro, id_categoria FROM LIVRO_TEM_CATEGORIA`;
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar livro-categoria:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar uma relação
const deletarRelacaoLivCat = async function (id_livro, id_categoria) {
  try {
    const sql = `
      DELETE FROM LIVRO_TEM_CATEGORIA
      WHERE id_livro = $1 AND id_categoria = $2
      RETURNING *
    `;
    const valores = [id_livro, id_categoria];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar livro-categoria:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarRelacaoLivCat, listarRelacoesLivCat, deletarRelacaoLivCat};

// FEITO
