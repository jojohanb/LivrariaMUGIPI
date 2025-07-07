const db = require("../config/database");

// Responsável por inserir uma nova editora no banco de dados 
const cadastrarEditora = async function (nome_editora) {
  try {
    const sql = 'INSERT INTO editora (nome_editora) VALUES ($1) RETURNING *';
    const valores = [nome_editora];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarEditora do model:', erro.message, erro.stack);
    throw erro;
  }
};

// Responsável por listar as editoras do banco de dados
const listarEditora = async function () {
  const sql = 'SELECT id_editora, nome_editora FROM editora';
  try {
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar editoras', erro.message, erro.stack);
    throw erro;
  }
}

// Responsável por atualizar as editoras do banco de dados
const atualizarEditora = async function (nome_editora, id_editora) {
  try {
    const sql = 'UPDATE editora SET nome_editora = $1 WHERE id_editora = $2 RETURNING *';
    const valores = [nome_editora, id_editora];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar na função atualizarEditora do model:', erro.message, erro.stack);
    throw erro;
  }
};

// Responsável por deletar as editoras do banco de dados
const deletarEditora = async function (nome_editora) {
  try {
    const sql = 'DELETE FROM editora WHERE nome_editora=$1 RETURNING *';
    const valores = [nome_editora];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0) {
      console.log('Nenhuma editora encontrada com esse nome');
      return null;
    }

    console.log('Editora deletada com sucesso:', resultado.rows[0]);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar editora na função de deletarEditora do model:', erro.message, erro.stack);
    throw erro;
  }
}

module.exports = { cadastrarEditora, listarEditora, atualizarEditora, deletarEditora };
//FEITO
