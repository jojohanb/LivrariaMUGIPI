const db = require("../config/database");
// Função responsável por criar um autor
// exports.cadastrarAutor = async function (novo_autor) {
//     try {
//     const sql = 'INSERT INTO AUTORES (nome) VALUES ($1) RETURNING *';
//     const valores = [novo_autor.nome];

//     const resultado = await db.query(sql, valores);
//     return resultado.rows[0]; // retorna o autor inserido
//   } catch (erro) {
//     console.error('Erro ao cadastrar autor:', erro);
//     throw erro;
//   }
// };
exports.cadastrarAutor = async function (novo_autor) {
  try {
    console.log('Tentando cadastrar autor:', novo_autor);
    const sql = 'INSERT INTO autores (nome) VALUES ($1) RETURNING *';
    const valores = [novo_autor.nome];
    const resultado = await db.query(sql, valores);
    console.log('Resultado da inserção:', resultado.rows[0]);
    return resultado.rows[0];
  } catch (erro) {
    // console.error('Erro ao cadastrar autor (detalhe):', erro);
    console.error('Erro ao cadastrar autor:', erro.message, erro.stack);
    throw erro;
  }
};

