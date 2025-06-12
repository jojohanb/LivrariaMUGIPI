// // const pg = require("pg");
// // const pgPool = new pg.Pool({
// //     host:'127.0.0.1',
// //     database: 'livrariaMUGI',
// //     user:'postgres',
// //     password:'postgres',
// //     port:5432,
// //     ssl:false
// // });

// // module.exports = {pgPool};

// //PARTE QUE EU FIZ
// //Isso permite criar um "pool de conexões", ou seja, múltiplas conexões gerenciadas automaticamente.
// const { Pool } = require('pg');
// //dotenv server para que possamos armazenar as nossas variáveis de ambiente que não desejamos deixar disponível para o público ao realizar um commit.
// const dotenv = require('dotenv');
// //Carrega as variáveis do arquivo .env e as coloca em process.env.
// dotenv.config();

// // Conexão com a Base de Dados:
// const pool = new Pool({
//   connectionString: process.env.CONNECTION_STRING
// });
// //Se estiver conectado exibe uma mensagem
// pool.on('connect', () => {
//   console.log('Base de Dados conectado com sucesso!');
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };