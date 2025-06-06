//Importa a classe Pool da biblioteca pg, usada para criar uma "piscina" de conexões com o banco de dados const 
const { Pool } = require('pg');
//Importa o pacote dotenv e carrega as variáveis de ambiente do arquivo .env
const dotenv = require('dotenv');
dotenv.config();

// Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});
pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});
// permite realizar consultas simples e seguras no bd
module.exports = {
  query: (text, params) => pool.query(text, params),
};

//ANOTAÇÕES FEITAS.
