//ANOTAÇÕES FEITAS
// Esse código define uma rota de API usando Express.js para cadastrar autores em um sistema. 
const express = require('express');
// ajuda a organizar as rotas por arquivos
const router = express.Router();
const categoriaDAO = require('../model/categoria.dao');

// ROTA PARA CADASTRAR UMA CATEGORIA
router.post('/cadastrar', async (req, res) => {
  try {
    if (!('nome_categoria' in req.body) || req.body.nome_categoria.trim() === '') {
      return res.status(400).json({ 'error': 'Nome faltando na categoria' });
    }
    const categoriaCriada = await categoriaDAO.cadastrarCategoria(req.body.nome_categoria.trim());
    // Responde o cliente se der certo com status 201
    res.status(201).json({ 'message': 'ok' });
  } catch (erro) {
    // Se der erro, responde com o status erro 500
    res.status(500).json({ erro: 'Erro na função de cadastro de categoria do controller' });
  }
});
// ROTA DE LISTAGEM DE TODAS AS CATEGORIAS
router.get('/listar', async (req, res) => {
  try {
    const categoria = await categoriaDAO.listarCategorias();
    res.status(200).json({ 'categoria': categoria });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar categorias' });
  }
});

// ROTA DE ATUALIZAR CATEGORIA
router.put('/:id', async (req, res) => {
  const id_categoria = parseInt(req.params.id);
  const { nome_categoria } = req.body;

  if (!nome_categoria || isNaN(id_categoria)) {
    return res.status(400).json({ mensagem: 'Nome e ID válidos são obrigatórios.' });
  }

  try {
    const categoriaAtualizada = await categoriaDAO.atualizarCategoria(nome_categoria.trim(), id_categoria);
    if (!categoriaAtualizada) {
      return res.status(404).json({ mensagem: 'Categoria não encontrado.' });
    }
    res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar categoria.', erro: erro.message });
  }
});

//ROTA PARA DELETAR CATEGORIAS
router.delete('/deletar', async (req, res) => {
  try {
    const { nome_categoria } = req.body;
    if (!nome_categoria || nome_categoria.trim() === '') {
      return res.status(400).json({ erro: 'O nome da categoria é obrigatório para deletar.' });
    }
    const categoriaDeletada = await categoriaDAO.deletarCategoria(nome_categoria.trim());
    if (!categoriaDeletada) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Categoria deletada com sucesso.', categoria: categoriaDeletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de deletar categoria do controller.' });
  }
});

module.exports = router;