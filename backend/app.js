const express = require('express');
const app = express();
const port = 8086;
const cors = require('cors');
app.use(cors());


const autorController = require ('./controller/autor.controller');
const autor = require('./entidades/autor');
const { cadastrarAutor } = require('./model/autor.dao');


//Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use(express.json()); // para aceitar JSON no corpo da requisição
app.use('/autor', autorController); // monta a rota /autor/cadastrar

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});