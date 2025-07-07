
const db = require("../config/database");
//Responsável por inserir um novo autor no banco de dados 
const cadastrarCategoria = async function (nome_categoria) {
  try {
    const sql = 'INSERT INTO categoria (nome_categoria) VALUES ($1) RETURNING *';
    const valores = [nome_categoria];
    const resultado = await db.query(sql, valores);
    return ;
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarCategoria do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por listar os autores do banco de dados
const listarCategorias = async function () {
    const sql = 'SELECT id_categoria, nome_categoria FROM CATEGORIA';
    try{
      const resultado = await db.query(sql);
      return resultado.rows;
    } catch(erro){
      console.error('Erro ao listar categorias', erro.message, erro.stack);
      throw erro;
    }
    
}
//Responsavel por atualizar os autores do banco de dados
const atualizarCategoria = async function (nome_categoria, id_categoria) {
  try {
    const sql = 'UPDATE categoria SET nome_categoria = $1 WHERE id_categoria = $2 RETURNING *';
    const valores = [nome_categoria, id_categoria];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar na função atualizarCategoria do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por deletar os autores do banco de dados
const deletarCategoria = async function (nome_categoria) {
    try {
    const sql = 'DELETE FROM categoria WHERE nome_categoria=$1 RETURNING *';
    const valores = [nome_categoria];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0){
      console.log('Nenhuma categoria encontrada com esse nome')
      return null;
    }
    console.log('Categoria deletada com sucesso:',resultado.rows[0]);
    return resultado.rows[0]
  } catch (erro) {
    console.error('Erro ao deletar categoria na função de deletarCategoria do model:', erro.message, erro.stack);
    throw erro;
  }
  
}


module.exports = { cadastrarCategoria, listarCategorias, atualizarCategoria, deletarCategoria }
//FEITO