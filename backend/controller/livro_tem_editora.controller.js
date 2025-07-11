const express = require('express');
const router = express.Router();
const livroEditoraDAO = require('../model/livro_tem_editora.dao.js');

// Cadastrar livro-editora
router.post('/cadastrar', async (req, res) => {
  try {
    const { id_livro, id_editora } = req.body;

    if (!id_livro || !id_editora) {
      return res.status(400).json({ erro: 'id_livro e id_editora são obrigatórios.' });
    }

    const novaRelacao = await livroEditoraDAO.cadastrarRelacaoLivEdit(parseInt(id_livro), parseInt(id_editora));
    res.status(201).json({ mensagem: 'Relação livro-editora cadastrada com sucesso.', relacao: novaRelacao });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar livro-editora.' });
  }
});

// Listar todas as relações
router.get('/listar', async (req, res) => {
  try {
    const lista = await livroEditoraDAO.listarRelacoesLivEdit();
    res.status(200).json({ relacoes: lista });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar relações livro-editora.' });
  }
});

// Deletar uma relação
router.delete('/deletar', async (req, res) => {
  try {
    const { id_livro, id_editora } = req.body;

    if (!id_livro || !id_editora) {
      return res.status(400).json({ erro: 'id_livro e id_editora são obrigatórios.' });
    }

    const deletada = await livroEditoraDAO.deletarRelacaoLivEdit(parseInt(id_livro), parseInt(id_editora));
    if (!deletada) {
      return res.status(404).json({ mensagem: 'Relação não encontrada para exclusão.' });
    }

    res.status(200).json({ mensagem: 'Relação deletada com sucesso.', relacao: deletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar relação livro-editora.' });
  }
});

module.exports = router;
// FEITO
