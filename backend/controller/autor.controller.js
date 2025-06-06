//Esse código define uma rota de API usando Express.js para cadastrar autores em um sistema. 
const express = require('express');
//ajuda a organizar as rotas por arquivos
const router = express.Router();
const autorDAO = require('../model/autor.dao');

//ROTA PARA CADASTRAR UM AUTOR
router.post('/cadastrar', async (req, res) => {
  try {
    if( 'nome' in req.body===false || req.body.nome.trim()===''){
        res.status(404).json({'error':'Nome faltando no autor'})
    }
    const autorCriado = await autorDAO.cadastrarAutor(req.body.nome);
    //Responde o cliente se der certo com status 201
    res.status(201).json({'message':'ok'});
  } catch (erro) {
    //Se der erro, responde com o status erro 500
    res.status(500).json({ erro: 'Erro na função de cadastro de autor do controller' });
  }
});

//ROTA DE LISTAGEM DE TODOS OS AUTORES
router.get('/listar', async (req, res) => {
  try{
      const autores = await autorDAO.listarAutores();
      res.status(200).json({'autores':autores});
  }catch(erro){
      res.status(400).json({ erro: 'Erro ao listar autores' });
  }
})

module.exports = router;

//ANOTAÇÕES FEITAS