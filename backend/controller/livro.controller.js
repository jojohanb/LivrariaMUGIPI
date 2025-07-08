const express = require('express');
const router = express.Router();
const livroDAO = require('../model/livro.dao');

// Cadastrar livro
router.post('/cadastrar', async (req, res) => {
  try {
    const { isbn, titulo, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria } = req.body;

    if (!isbn || !titulo || !id_editora || !qtd_disponivel || !id_categoria || !id_subcategoria) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }

    const livro = await livroDAO.cadastrarLivro(isbn, titulo, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria);
    res.status(201).json({ mensagem: 'Livro cadastrado com sucesso.', livro });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar livro.', detalhes: erro.message });
  }
});

// Listar livros
router.get('/listar', async (req, res) => {
  try {
    const livros = await livroDAO.listarLivros();
    res.status(200).json({ livros });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar livros.' });
  }
});

// Atualizar livro
router.put('/:id', async (req, res) => {
  const id_livro = parseInt(req.params.id);
  const { isbn, titulo, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria } = req.body;

  if (!isbn || !titulo || !id_editora || !qtd_disponivel || !id_categoria || !id_subcategoria || isNaN(id_livro)) {
    return res.status(400).json({ erro: 'Dados inválidos.' });
  }

  try {
    const livroAtualizado = await livroDAO.atualizarLivro(id_livro, isbn, titulo, id_editora, qtd_disponivel, edicao, id_categoria, id_subcategoria);
    if (!livroAtualizado) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Livro atualizado com sucesso.', livro: livroAtualizado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar livro.', detalhes: erro.message });
  }
});

// Deletar livro
router.delete('/deletar', async (req, res) => {
  try {
    const { id_livro } = req.body;
    if (!id_livro || isNaN(id_livro)) {
      return res.status(400).json({ erro: 'ID do livro é obrigatório e deve ser um número.' });
    }

    const livroDeletado = await livroDAO.deletarLivro(parseInt(id_livro));
    if (!livroDeletado) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Livro deletado com sucesso.', livro: livroDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar livro.', detalhes: erro.message });
  }
});

module.exports = router;
//FEITO