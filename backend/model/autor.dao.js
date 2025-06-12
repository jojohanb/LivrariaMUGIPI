const db = require("../config/database");
//Responsável por inserir um novo autor no banco de dados 
const cadastrarAutor = async function (nome) {
  try {
    // console.log('Tentando cadastrar autor:', novo_autor);
    const sql = 'INSERT INTO autores (nome) VALUES ($1) RETURNING *';
    const valores = [nome];
    //Executa o comando SQL usando a conexão do banco.
    //Executa uma consulta
    const resultado = await db.query(sql, valores);
    // console.log('Resultado da inserção:', resultado.rows[0]);
    //A função retorna esse autor criado para ser usado na resposta da API.
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


module.exports = { cadastrarAutor, listarAutores, atualizarAutores, deletarAutores }