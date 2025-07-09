const db = require("../config/database");

const cadastrarSubcategoria = async function (id_categoria) {
  try {
    const sql = 'INSERT INTO arvore_categoria (id_categoria) VALUES ($1) RETURNING *';
    const valores = [id_categoria];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarSubcategoria:', erro.message, erro.stack);
    throw erro;
  }
};

const listarSubcategorias = async function () {
  const sql = 'SELECT id_subcategoria, id_categoria FROM arvore_categoria';
  try {
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar subcategorias:', erro.message, erro.stack);
    throw erro;
  }
};

const atualizarSubcategoria = async function (id_subcategoria, id_categoria) {
  try {
    const sql = 'UPDATE arvore_categoria SET id_categoria = $1 WHERE id_subcategoria = $2 RETURNING *';
    const valores = [id_categoria, id_subcategoria];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar subcategoria:', erro.message, erro.stack);
    throw erro;
  }
};

const deletarSubcategoria = async function (id_subcategoria) {
  try {
    const sql = 'DELETE FROM arvore_categoria WHERE id_subcategoria = $1 RETURNING *';
    const valores = [id_subcategoria];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar subcategoria:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarSubcategoria, listarSubcategorias, atualizarSubcategoria, deletarSubcategoria };
//Exporta as funcionalidades
//FEITO