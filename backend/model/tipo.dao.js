const db = require("../config/database");
//Responsável por inserir um novo tipo no banco de dados 
const cadastrarTipo = async function (descricao) {
  try {
    // console.log('Tentando cadastrar autor:', novo_autor);
    const sql = 'INSERT INTO tipo (descricao) VALUES ($1) RETURNING *';
    const valores = [descricao];
    //Executa o comando SQL usando a conexão do banco.
    //Executa uma consulta
    const resultado = await db.query(sql, valores);
    // console.log('Resultado da inserção:', resultado.rows[0]);
    //A função retorna esse tipo criado para ser usado na resposta da API.
    return ;
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarTipo do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por listar os autores do banco de dados
const listarTipos = async function () {
    const sql = 'SELECT tipo_id, descricao FROM TIPO';
    try{
      const resultado = await db.query(sql);
      return resultado.rows;
    } catch(erro){
      console.error('Erro ao listar os tipos', erro.message, erro.stack);
      throw erro;
    }
    
}
//Responsavel por atualizar os autores do banco de dados
const atualizarTipo = async function (descricao, tipo_id) {
  try {
    const sql = 'UPDATE tipo SET descricao = $1 WHERE tipo_id = $2 RETURNING *';
    const valores = [descricao, tipo_id];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar na função atualizarTipo do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por deletar os autores do banco de dados
const deletarTipo = async function (descricao) {
    try {
    const sql = 'DELETE FROM tipo WHERE descricao=$1 RETURNING *';
    const valores = [descricao];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0){
      console.log('Nenhum tipo encontrado com essa descricao')
      return null;
    }
    console.log('Tipo deletado com sucesso:',resultado.rows[0]);
    return resultado.rows[0]
  } catch (erro) {
    console.error('Erro ao deletar tipo na função de deletarTipo do model:', erro.message, erro.stack);
    throw erro;
  }
  
}


module.exports = { cadastrarTipo, listarTipos, atualizarTipo, deletarTipo }