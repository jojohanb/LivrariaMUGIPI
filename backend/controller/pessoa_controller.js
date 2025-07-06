const express = require('express');
const router = express.Router();
const editoraDAO = require('../model/pessoa.dao');

// ROTA PARA CADASTRAR UMA PESSOA
router.post('/cadastrar', async (req, res) => {
  try {
    if (!('nome' in req.body) || req.body.nome.trim() === '') {
      return res.status(400).json({ error: 'Nome da Pessoa é obrigatório.' });
    }
    const pessoaCriada = await pessoaDAO.Pessoa(req.body.nome.trim());
    res.status(201).json({ message: 'Pessoa criada com sucesso!', pessoa: pessoaCriada }); // MELHORIA
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de cadastro de pessoa do controller.' });
  }
});

// ROTA DE LISTAGEM DE TODAS AS EDITORAS
router.get('/listar', async (req, res) => {
  try {
    const editora = await pessoaDAO.listarEditora();
    res.status(200).json({ editora });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar editora' });
  }
});

// ROTA DE ATUALIZAR AS EDITORAS
router.put('/:id', async (req, res) => {
  const ra_pessoa = parseInt(req.params.id);
  const { nome } = req.body;

  if (!nome || isNaN(ra_pessoa)) {
    return res.status(400).json({ mensagem: 'Nome e RA válidos são obrigatórios.' });
  }

  try {
    const pessoaAtualizada = await pessoaDAO.Pessoa(nome.trim(), ra_pessoa);
    if (!pessoaAtualizada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }
    res.status(200).json(pessoaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar pessoa.', erro: erro.message });
  }
});

// ROTA DE DELETAR AS PESSOAS
router.delete('/deletar', async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ erro: 'Nome da pessoa é obrigatório para deletar.' });
    }
    const pessoaDeletada = await pessoaDAO.deletarPessoa(nome.trim());
    if (!pessoaDeletada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Pessoa deletada com sucesso.', pessoa: pessoaDeletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de deletar pessoa do controller.' });
  }
});

module.exports = router;
