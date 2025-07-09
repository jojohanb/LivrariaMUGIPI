const express = require('express');
const router = express.Router();
const emprestimoDAO = require('../model/emprestimo.dao');

// Cadastrar empréstimo
router.post('/cadastrar', async (req, res) => {
  try {
    const { ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico } = req.body;

    if (!ra_pessoa || !id_livro || !data_emprestimo) {
      return res.status(400).json({ error: 'RA da pessoa, ID do livro e data do empréstimo são obrigatórios.' });
    }

    const novoEmprestimo = await emprestimoDAO.cadastrarEmprestimo(
      parseInt(ra_pessoa),
      parseInt(id_livro),
      data_emprestimo,
      data_devolucao || null,
      historico || null
    );

    res.status(201).json({ mensagem: 'Empréstimo cadastrado com sucesso.', emprestimo: novoEmprestimo });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar empréstimo.', detalhes: erro.message });
  }
});

// Listar empréstimos
router.get('/listar', async (req, res) => {
  try {
    const emprestimos = await emprestimoDAO.listarEmprestimos();
    res.status(200).json({ emprestimos });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar empréstimos.' });
  }
});

// Atualizar empréstimo
router.put('/:id', async (req, res) => {
  const id_emprestimo = parseInt(req.params.id);
  const { ra_pessoa, id_livro, data_emprestimo, data_devolucao, historico } = req.body;

  try {
    const emprestimoAtualizado = await emprestimoDAO.atualizarEmprestimo(
      id_emprestimo,
      parseInt(ra_pessoa),
      parseInt(id_livro),
      data_emprestimo,
      data_devolucao || null,
      historico || null
    );

    if (!emprestimoAtualizado) {
      return res.status(404).json({ mensagem: 'Empréstimo não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Empréstimo atualizado com sucesso.', emprestimo: emprestimoAtualizado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar empréstimo.', detalhes: erro.message });
  }
});

// Deletar empréstimo
router.delete('/deletar', async (req, res) => {
  try {
    const { id_emprestimo } = req.body;
    if (!id_emprestimo || isNaN(id_emprestimo)) {
      return res.status(400).json({ erro: 'ID do empréstimo é obrigatório e deve ser numérico.' });
    }

    const emprestimoDeletado = await emprestimoDAO.deletarEmprestimo(parseInt(id_emprestimo));

    if (!emprestimoDeletado) {
      return res.status(404).json({ mensagem: 'Empréstimo não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Empréstimo deletado com sucesso.', emprestimo: emprestimoDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar empréstimo.', detalhes: erro.message });
  }
});

module.exports = router; // Exporta o router para ser usado no app principal
//FEITO