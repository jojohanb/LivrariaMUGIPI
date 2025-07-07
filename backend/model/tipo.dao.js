const db = require("../config/database");

// Cadastrar tipo
const cadastrarTipo = async function (tipo_id, descricao) {
  try {
    const sql = 'INSERT INTO tipo (tipo_id, descricao) VALUES ($1, $2) RETURNING *';
    const valores = [tipo_id, descricao];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar tipo:', erro.message, erro.stack);
    throw erro;
  }
};



// Listar todos os tipos
const listarTipos = async () => {
  try {
    const sql = 'SELECT tipo_id, descricao FROM tipo';
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar os tipos:', erro.message, erro.stack);
    throw erro;
  }
};

// Atualizar tipo
const atualizarTipo = async (descricao, tipo_id) => {
  try {
    const sql = 'UPDATE tipo SET descricao = $1 WHERE tipo_id = $2 RETURNING *';
    const valores = [descricao, tipo_id];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar tipo:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar tipo por ID
const deletarTipo = async (tipo_id) => {
  try {
    const sql = 'DELETE FROM tipo WHERE tipo_id = $1 RETURNING *';
    const valores = [tipo_id];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0) {
      return null;
    }

    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar tipo:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarTipo, listarTipos, atualizarTipo, deletarTipo };
//FEITO