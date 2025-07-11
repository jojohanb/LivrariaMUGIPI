const express = require('express');
const router = express.Router();
const livroCategoriaDAO = require('../model/livro_tem_categoria.dao');

// Cadastrar livro-categoria
router.post('/cadastrar', async (req, res) => {
  try {
    const { id_livro, id_categoria } = req.body;

    if (!id_livro || !id_categoria) {
      return res.status(400).json({ erro: 'id_livro e id_categoria são obrigatórios.' });
    }

    const novaRelacao = await livroCategoriaDAO.cadastrarRelacaoLivCat(parseInt(id_livro), parseInt(id_categoria));
    res.status(201).json({ mensagem: 'Relação livro-categoria cadastrada com sucesso.', relacao: novaRelacao });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar livro-categoria.' });
  }
});

// Listar todas as relações
router.get('/listar', async (req, res) => {
  try {
    const lista = await livroCategoriaDAO.listarRelacoesLivCat();
    res.status(200).json({ relacoes: lista });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar relações livro-categoria.' });
  }
});

// Deletar uma relação
router.delete('/deletar', async (req, res) => {
  try {
    const { id_livro, id_categoria } = req.body;

    if (!id_livro || !id_categoria) {
      return res.status(400).json({ erro: 'id_livro e id_categoria são obrigatórios.' });
    }

    const deletada = await livroCategoriaDAO.deletarRelacaoLivCat(parseInt(id_livro), parseInt(id_categoria));
    if (!deletada) {
      return res.status(404).json({ mensagem: 'Relação não encontrada para exclusão.' });
    }

    res.status(200).json({ mensagem: 'Relação deletada com sucesso.', relacao: deletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar relação livro-categoria.' });
  }
});

module.exports = router;
// FEITO
