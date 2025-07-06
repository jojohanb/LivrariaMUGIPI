const db = require("../config/database");

// Responsável por inserir uma nova pessoa no banco de dados 
const cadastrarPessoa = async function (ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login,  senha) {
  try {
    const sql = 'INSERT INTO pessoa (ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const raRegex = /^a\d{7}$/;
    if (!raRegex.test(ra_pessoa)) {
      throw new Error('ra_pessoa inválido. Deve estar no formato "a1234567"');
    }
    const valores = [ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0]; // Retorna a pessoa criada
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarPessoa do model:', erro.message, erro.stack);
    throw erro;
  }
};


// Responsável por listar as pessoas do banco de dados
const listarPessoa = async function () {
  const sql = 'SELECT ra_pessoa, nome, email, telefone, data_nascimento, login FROM pessoa';
  try {
    const resultado = await db.query(sql);
    return resultado.rows;
  } catch (erro) {
    console.error('Erro ao listar pessoas', erro.message, erro.stack);
    throw erro;
  }
}

// Responsável por atualizar as pessoas do banco de dados
const atualizarPessoa = async function (ra_pessoa, nome, email, telefone, data_nascimento, login,  senha) {
    
    try {
    const raRegex = /^a\d{7}$/;
    if (!raRegex.test(ra_pessoa)) {
      throw new Error('ra_pessoa inválido. Deve estar no formato "a1234567"');
    }
    const sql = 'UPDATE pessoa SET nome = $1, email = $2, telefone = $3, data_nascimento = $4, login = $5, senha = $6 WHERE ra_pessoa = $7 RETURNING *';
    const valores = [nome, ra_pessoa, email, telefone, data_nascimento, login,  senha];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar na função atualizarPessoa do model:', erro.message, erro.stack);
    throw erro;
  }
};

// Responsável por deletar as pessoas do banco de dados
const deletarPessoa = async function (ra_pessoa) {
  try {
    const sql = 'DELETE FROM pessoa WHERE ra_pessoa=$1 RETURNING *';
    const valores = [ra_pessoa];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0) {
      console.log('Nenhuma pessoa encontrada com esse nome');
      return null;
    }

    console.log('Pessoa deletada com sucesso:', resultado.rows[0]);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao deletar pessoa na função de deletarPessoa do model:', erro.message, erro.stack);
    throw erro;
  }
}

module.exports = {
  cadastrarPessoa,
  listarPessoa,
  atualizarPessoa,
  deletarPessoa
};
