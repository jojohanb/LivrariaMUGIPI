//Rodando aplicações web, como os middlewares e as rotas 
const express = require('express');
const app = express();
const port = 8086;
// permite que o backend seja acessado pelo REACT
const cors = require('cors');
app.use(cors());

//importa o módulo de rotas de autor 
const autorController = require ('./controller/autor.controller');
const categoriaController = require ('./controller/categoria.controller');
const editoraController = require ('./controller/editora.controller')

app.use(express.json()); // para aceitar JSON no corpo da requisição
app.use('/autor', autorController); // monta a rota ex:/autor/cadastrar
app.use('/categoria', categoriaController) //monta a rota /categoria
app.use('/editora', editoraController) //monta a rota /categoria

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});



