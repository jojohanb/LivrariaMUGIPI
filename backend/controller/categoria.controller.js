const express = require('express');
const router = express.Router();
const categoriaDAO = require('../model/categoria.dao'); // Importa o módulo de acesso ao banco de dados relacionado à categoria

// ROTA PARA CADASTRAR UMA CATEGORIA
router.post('/cadastrar', async (req, res) => {
  try {
    if (!('nome_categoria' in req.body) || req.body.nome_categoria.trim() === '') {
      return res.status(400).json({ 'error': 'Nome faltando na categoria' });
    }
    const categoriaCriada = await categoriaDAO.cadastrarCategoria(req.body.nome_categoria.trim());
    res.status(201).json({ 'message': 'ok' });
  } catch (erro) {
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
  const id_categoria = parseInt(req.params.id); // Extrai o ID da URL e converte para inteiro
  const { nome_categoria } = req.body;

  // Valida o nome e o ID da categoria
  if (!nome_categoria || isNaN(id_categoria)) {
    return res.status(400).json({ mensagem: 'Nome e ID válidos são obrigatórios.' });
  }
  try {
    const categoriaAtualizada = await categoriaDAO.atualizarCategoria(nome_categoria.trim(), id_categoria);

    // Verifica se a categoria foi encontrada
    if (!categoriaAtualizada) {
      return res.status(404).json({ mensagem: 'Categoria não encontrado.' });
    }

    // Retorna a categoria atualizada
    res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar categoria.', erro: erro.message });
  }
});

// ROTA PARA DELETAR CATEGORIAS
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

module.exports = router; // Exporta o router para ser usado no app principal
