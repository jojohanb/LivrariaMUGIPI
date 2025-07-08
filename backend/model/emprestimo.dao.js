const db = require('../config/database');

const cadastrarEmprestimo = async (ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico) => {
  const sql = `
    INSERT INTO emprestimo (ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const valores = [ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico];

  const resultado = await db.query(sql, valores);
  return resultado.rows[0];
};

const listarEmprestimos = async () => {
  const sql = `SELECT * FROM emprestimo ORDER BY id_emprestimo`;
  const resultado = await db.query(sql);
  return resultado.rows;
};

const atualizarEmprestimo = async (id_emprestimo, ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico) => {
  const sql = `
    UPDATE emprestimo
    SET ra_pessoa = $1, id_livro = $2, data_emprestimo = $3, data_devolucao = $4, historico = $5
    WHERE id_emprestimo = $6 RETURNING *`;
  const valores = [ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico, id_emprestimo];

  const resultado = await db.query(sql, valores);
  return resultado.rows[0];
};

const deletarEmprestimo = async (id_emprestimo) => {
  const sql = `DELETE FROM emprestimo WHERE id_emprestimo = $1 RETURNING *`;
  const valores = [id_emprestimo];
  const resultado = await db.query(sql, valores);
  return resultado.rows[0];
};

module.exports = {
  cadastrarEmprestimo,
  listarEmprestimos,
  atualizarEmprestimo,
  deletarEmprestimo
};
//FEITO