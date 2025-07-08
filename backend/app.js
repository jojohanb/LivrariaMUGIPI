const express = require('express');
const app = express();
const port = 8086;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ROTAS
const autorController = require('./controller/autor.controller');
const categoriaController = require('./controller/categoria.controller');
const editoraController = require('./controller/editora.controller');
const tipoController = require('./controller/tipo.controller');
const pessoaController = require('./controller/pessoa.controller');
const arvoreCategoriaController = require('./controller/arvore_categoria.controller');
const cursoController = require ( './controller/curso.controller' )
const livroController = require('./controller/livro.controller');
const emprestimoController = require('./controller/emprestimo.controller');
const dividaController = require('./controller/divida.controller');


app.use('/autor', autorController);
app.use('/categoria', categoriaController);
app.use('/editora', editoraController);
app.use('/tipo', tipoController);
app.use('/pessoa', pessoaController);
app.use('/arvore_categoria', arvoreCategoriaController);
app.use('/curso', cursoController);
app.use('/livro', livroController);
app.use('/emprestimo', emprestimoController);
app.use('/divida', dividaController);



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
//FEITO