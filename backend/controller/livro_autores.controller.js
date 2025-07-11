const express = require('express');
const router = express.Router();
const livroAutoresDAO = require('../model/livro_autores.dao');

// Cadastrar relação livro-autor
router.post('/cadastrar', async (req, res) => {
  try {
    const { id_livro, id_autor } = req.body;

    if (!id_livro || isNaN(id_livro) || !id_autor || isNaN(id_autor)) {
      return res.status(400).json({ erro: 'IDs do livro e autor são obrigatórios e devem ser válidos.' });
    }

    const novaRelacao = await livroAutoresDAO.cadastrarRelacaoAutLiv(parseInt(id_livro), parseInt(id_autor));
    res.status(201).json({ mensagem: 'Relação livro-autor criada com sucesso.', relacao: novaRelacao });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar relação.' });
  }
});

// Listar todas as relações
router.get('/listar', async (req, res) => {
  try {
    const relacoes = await livroAutoresDAO.listarRelacoesAutLiv();
    res.status(200).json({ relacoes });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar relações.' });
  }
});

// Deletar uma relação
router.delete('/deletar', async (req, res) => {
  try {
    const { id_livro, id_autor } = req.body;

    if (!id_livro || isNaN(id_livro) || !id_autor || isNaN(id_autor)) {
      return res.status(400).json({ erro: 'IDs do livro e autor são obrigatórios e devem ser válidos.' });
    }

    const deletada = await livroAutoresDAO.deletarRelacaoAutLiv(parseInt(id_livro), parseInt(id_autor));

    if (!deletada) {
      return res.status(404).json({ mensagem: 'Relação não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Relação deletada com sucesso.', relacao: deletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar relação.' });
  }
});

module.exports = router;
