const express = require('express');
const app = express();
const port = 8086;
// Importa o CORS para permitir requisições de outros domínios
const cors = require('cors');
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Permite receber dados em formato JSON nas requisições

// Importa os controladores responsáveis pelas rotas da aplicação
const autorController = require('./controller/autor.controller');
const categoriaController = require('./controller/categoria.controller');
const editoraController = require('./controller/editora.controller');
const tipoController = require('./controller/tipo.controller');
const pessoaController = require('./controller/pessoa.controller');
const arvoreCategoriaController = require('./controller/arvore_categoria.controller');
const cursoController = require('./controller/curso.controller');
const livroController = require('./controller/livro.controller');
const emprestimoController = require('./controller/emprestimo.controller');
const dividaController = require('./controller/divida.controller');
const cursoPessoaController = require('./controller/curso_pessoa.controller');
const livroAutoresController = require('./controller/livro_autores.controller');

// Define os caminhos base para cada conjunto de rotas
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
app.use('/livro_autores', livroAutoresController);
app.use('/curso_pessoa', cursoPessoaController);

//Inicia o servidor na porta definida e exibe uma mensagem no console
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
//FEITO