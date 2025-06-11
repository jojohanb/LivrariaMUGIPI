const db = require("../config/database");
//Responsável por inserir um novo autor no banco de dados 
const cadastrarLivro = async function (nome) {
  try {
    // console.log('Tentando cadastrar autor:', novo_autor);
    const sql = 'INSERT INTO livros (nome) VALUES ($1) RETURNING *';
    const valores = [nome];
    //Executa o comando SQL usando a conexão do banco.
    //Executa uma consulta
    const resultado = await db.query(sql, valores);
    // console.log('Resultado da inserção:', resultado.rows[0]);
    //A função retorna esse autor criado para ser usado na resposta da API.
    return ;
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarLivro do model:', erro.message, erro.stack);
    throw erro;
  }
};
