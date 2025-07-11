const db = require("../config/database");

// Cadastrar relação entre pessoa e curso
const cadastrarRelacaoCurPes = async function (ra_pessoa, id_curso, ano_ingresso) {
  try {
    const sql = `
      INSERT INTO CURSO_PESSOA (ra_pessoa, id_curso, ano_ingresso)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const valores = [ra_pessoa, id_curso, ano_ingresso];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar curso-pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

// Listar todas as relações
const listarRelacoesCurPes = async function () {
  try {
    const sql = 'SELECT ra_pessoa, id_curso, ano_ingresso FROM CURSO_PESSOA';
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar curso-pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

// Atualizar ano de ingresso (mantendo ra_pessoa e id_curso)
const atualizarAnoIngresso = async function (ra_pessoa, id_curso, novo_ano_ingresso) {
  try {
    const sql = `
      UPDATE CURSO_PESSOA
      SET ano_ingresso = $3
      WHERE ra_pessoa = $1 AND id_curso = $2
      RETURNING *
    `;
    const valores = [ra_pessoa, id_curso, novo_ano_ingresso];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar curso-pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar uma relação
const deletarRelacaoCurPes = async function (ra_pessoa, id_curso) {
  try {
    const sql = `
      DELETE FROM CURSO_PESSOA
      WHERE ra_pessoa = $1 AND id_curso = $2
      RETURNING *
    `;
    const valores = [ra_pessoa, id_curso];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar curso-pessoa:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = { cadastrarRelacaoCurPes, listarRelacoesCurPes, atualizarAnoIngresso, deletarRelacaoCurPes };
// FEITO
