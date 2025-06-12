//Rodando aplicações web, como os middlewares e as rotas 
const express = require('express');
const app = express();
const port = 8086;
// permite que o backend seja acessado pelo REACT
const cors = require('cors');
app.use(cors());

//importa o módulo de rotas de autor 
const autorController = require ('./controller/autor.controller');

app.use(express.json()); // para aceitar JSON no corpo da requisição
app.use('/autor', autorController); // monta a rota /autor/cadastrar

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
