const express = require('express');
const router = express.Router();
const pessoaDAO = require('../model/pessoa.dao');

// Cadastrar pessoa
router.post('/cadastrar', async (req, res) => {
  try {
    const { ra_pessoa, tipo_id, nome, email, telefone, data_nascimento, login, senha } = req.body;

    if (!ra_pessoa || !nome || !email) {
      return res.status(400).json({ error: 'RA, nome e email são obrigatórios.' });
    }

    const novaPessoa = await pessoaDAO.cadastrarPessoa(
      parseInt(ra_pessoa),
      parseInt(tipo_id),
      nome.trim(),
      email.trim(),
      telefone,
      data_nascimento,
      login,
      senha
    );

    res.status(201).json({ message: 'Pessoa cadastrada com sucesso.', pessoa: novaPessoa });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar pessoa.', detalhes: erro.message });
  }
});

// Listar pessoas
router.get('/listar', async (req, res) => {
  try {
    const pessoas = await pessoaDAO.listarPessoa();
    res.status(200).json({ pessoas });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar pessoas.' });
  }
});

// Atualizar pessoa
router.put('/:id', async (req, res) => {
  const ra_pessoa = parseInt(req.params.id);
  const { nome, email, telefone, data_nascimento, login, senha } = req.body;

  if (!nome || !email || isNaN(ra_pessoa)) {
    return res.status(400).json({ mensagem: 'RA, nome e email são obrigatórios.' });
  }

  try {
    const pessoaAtualizada = await pessoaDAO.atualizarPessoa(
      ra_pessoa,
      nome.trim(),
      email.trim(),
      telefone,
      data_nascimento,
      login,
      senha
    );

    if (!pessoaAtualizada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Pessoa atualizada com sucesso.', pessoa: pessoaAtualizada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar pessoa.', detalhes: erro.message });
  }
});

// Deletar pessoa
router.delete('/deletar', async (req, res) => {
  try {
    const { ra_pessoa } = req.body;

    if (!ra_pessoa || isNaN(ra_pessoa)) {
      return res.status(400).json({ erro: 'RA é obrigatório e deve ser numérico.' });
    }

    const pessoaDeletada = await pessoaDAO.deletarPessoa(parseInt(ra_pessoa));

    if (!pessoaDeletada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Pessoa deletada com sucesso.', pessoa: pessoaDeletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar pessoa.', detalhes: erro.message });
  }
});

module.exports = router; // Exporta o router para ser usado no app principal
//FEITO