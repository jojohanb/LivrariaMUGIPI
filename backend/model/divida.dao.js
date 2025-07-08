const db = require('../config/database');

// Cadastrar dívida
const cadastrarDivida = async (ra_pessoa, valor_divida, data_vencimento, status, id_livro) => {
  try {
    const sql = `
      INSERT INTO dividas (ra_pessoa, valor_divida, data_vencimento, status, id_livro)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const valores = [ra_pessoa, valor_divida, data_vencimento, status, id_livro];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao cadastrar dívida:', erro.message, erro.stack);
    throw erro;
  }
};

// Listar todas as dívidas
const listarDividas = async () => {
  try {
    const sql = 'SELECT * FROM dividas';
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar dívidas:', erro.message, erro.stack);
    throw erro;
  }
};

// Atualizar dívida
const atualizarDivida = async (id_divida, valor_divida, data_vencimento, status) => {
  try {
    const sql = `
      UPDATE dividas SET valor_divida = $1, data_vencimento = $2, status = $3
      WHERE id_divida = $4 RETURNING *`;
    const valores = [valor_divida, data_vencimento, status, id_divida];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar dívida:', erro.message, erro.stack);
    throw erro;
  }
};

// Deletar dívida
const deletarDivida = async (id_divida) => {
  try {
    const sql = 'DELETE FROM dividas WHERE id_divida = $1 RETURNING *';
    const resultado = await db.query(sql, [id_divida]);

    if (resultado.rowCount === 0) return null;

    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar dívida:', erro.message, erro.stack);
    throw erro;
  }
};

module.exports = {
  cadastrarDivida,
  listarDividas,
  atualizarDivida,
  deletarDivida,
};
//FEITO