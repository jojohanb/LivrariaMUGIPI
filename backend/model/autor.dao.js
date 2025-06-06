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

module.exports = {cadastrarAutor, listarAutores}