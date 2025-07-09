const db = require("../config/database");
const cadastrarAutor = async function (nome) {
  try {
    const sql = 'INSERT INTO autores (nome) VALUES ($1) RETURNING *';
    const valores = [nome];
    const resultado = await db.query(sql, valores);
    return ;
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarAutor do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por listar os autores do banco de dados
const listarAutores = async function () {
    const sql = 'SELECT id_autor, nome FROM AUTORES';
    try{
      const resultado = await db.query(sql);
      return resultado.rows;
    } catch(erro){
      console.error('Erro ao listar os autores', erro.message, erro.stack);
      throw erro;
    }
    
}
//Responsavel por atualizar os autores do banco de dados
const atualizarAutores = async function (nome, id_autor) {
  try {
    const sql = 'UPDATE autores SET nome = $1 WHERE id_autor = $2 RETURNING *';
    const valores = [nome, id_autor];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar na função atualizarAutor do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por deletar os autores do banco de dados
const deletarAutores = async function (nome) {
    try {
    const sql = 'DELETE FROM autores WHERE nome=$1 RETURNING *';
    const valores = [nome];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0){
      console.log('Nenhum autor encontrado com esse nome')
      return null;
    }
    console.log('Autor deletado com sucesso:',resultado.rows[0]);
    return resultado.rows[0]
  } catch (erro) {
    console.error('Erro ao deletar autor na função de deletarAutor do model:', erro.message, erro.stack);
    throw erro;
  }
  
}


module.exports = { cadastrarAutor, listarAutores, atualizarAutores, deletarAutores };
//Exporta as funcionalidades
//FEITO