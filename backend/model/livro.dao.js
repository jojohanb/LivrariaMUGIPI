const db = require('../config/database');
//Responsável por cadastrar livros
const cadastrarLivro = async (isbn, titulo, id_autor, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria, url_capa) => {
  try {
    const sql = `
       INSERT INTO livro (isbn, titulo, id_autor, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria, url_capa)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const valores = [isbn, titulo, id_autor, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria, url_capa];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar livro:', erro.message);
    throw erro;
  }
};
//Responsável por listar livros
const listarLivros = async () => {
  try {
    const sql = 'SELECT * FROM livro';
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar livros:', erro.message);
    throw erro;
  }
};
//Responsável por atualizar livros
const atualizarLivro = async (id_livro, isbn, titulo, id_autor, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria, url_capa) => {
  try {
    const sql = `
      UPDATE livro SET isbn = $1, titulo = $2, id_autor = $3, id_editora = $4, qtd_disponivel = $5, edicao = $6, id_categoria = $7, id_subcategoria = $8, url_capa = $9
      WHERE id_livro = $9 RETURNING *`;
    const valores = [isbn, titulo, id_autor, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria, url_capa, id_livro];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar livro:', erro.message);
    throw erro;
  }
};
//Responsável por deletar livros
const deletarLivro = async (id_livro) => {
  try {
    const sql = 'DELETE FROM livro WHERE id_livro = $1 RETURNING *';
    const resultado = await db.query(sql, [id_livro]);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar livro:', erro.message);
    throw erro;
  }
};

module.exports = { cadastrarLivro, listarLivros, atualizarLivro, deletarLivro };
//Exporta as funcionalidades
//FEITO