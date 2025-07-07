const express = require('express');
const router = express.Router();
const arvoreDAO = require('../model/arvore_categoria.dao');

// Cadastrar subcategoria
router.post('/cadastrar', async (req, res) => {
  try {
    const { id_categoria } = req.body;
    if (!id_categoria || isNaN(id_categoria)) {
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }
    const nova = await arvoreDAO.cadastrarSubcategoria(parseInt(id_categoria));
    res.status(201).json({ message: 'Subcategoria criada com sucesso!', subcategoria: nova });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar subcategoria.' });
  }
});

// Listar subcategorias
router.get('/listar', async (req, res) => {
  try {
    const lista = await arvoreDAO.listarSubcategorias();
    res.status(200).json({ subcategorias: lista });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar subcategorias.' });
  }
});

// Atualizar subcategoria
router.put('/:id', async (req, res) => {
  const id_subcategoria = parseInt(req.params.id);
  const { id_categoria } = req.body;

  if (!id_categoria || isNaN(id_categoria)) {
    return res.status(400).json({ mensagem: 'ID da categoria é obrigatório.' });
  }

  try {
    const atualizada = await arvoreDAO.atualizarSubcategoria(id_subcategoria, parseInt(id_categoria));
    if (!atualizada) {
      return res.status(404).json({ mensagem: 'Subcategoria não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Atualizada com sucesso.', subcategoria: atualizada });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar.', erro: erro.message });
  }
});

// Deletar subcategoria
router.delete('/deletar', async (req, res) => {
  try {
    const { id_subcategoria } = req.body;
    if (!id_subcategoria || isNaN(id_subcategoria)) {
      return res.status(400).json({ erro: 'ID da subcategoria é obrigatório.' });
    }

    const deletada = await arvoreDAO.deletarSubcategoria(parseInt(id_subcategoria));
    if (!deletada) {
      return res.status(404).json({ mensagem: 'Subcategoria não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Deletada com sucesso.', subcategoria: deletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar subcategoria.' });
  }
});

module.exports = router;
//FEITO