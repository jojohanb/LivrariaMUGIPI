const express = require('express');
const router = express.Router();
const cursoPessoaDAO = require('../model/curso_pessoa.dao');

// Cadastrar curso-pessoa
router.post('/cadastrar', async (req, res) => {
  try {
    const { ra_pessoa, id_curso, ano_ingresso } = req.body;

    if (!ra_pessoa || !id_curso || !ano_ingresso) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const novaRelacao = await cursoPessoaDAO.cadastrarRelacaoCurPes(parseInt(ra_pessoa), parseInt(id_curso), ano_ingresso);
    res.status(201).json({ mensagem: 'Relação cadastrada com sucesso.', relacao: novaRelacao });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar curso-pessoa.' });
  }
});

// Listar curso-pessoa
router.get('/listar', async (req, res) => {
  try {
    const lista = await cursoPessoaDAO.listarRelacoesCurPes();
    res.status(200).json({ relacoes: lista });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar relações curso-pessoa.' });
  }
});

// Atualizar ano_ingresso
router.put('/atualizar', async (req, res) => {
  try {
    const { ra_pessoa, id_curso, novo_ano_ingresso } = req.body;

    if (!ra_pessoa || !id_curso || !novo_ano_ingresso) {
      return res.status(400).json({ erro: 'ra_pessoa, id_curso e novo_ano_ingresso são obrigatórios.' });
    }

    const atualizada = await cursoPessoaDAO.atualizarAnoIngresso(parseInt(ra_pessoa), parseInt(id_curso), novo_ano_ingresso);
    if (!atualizada) {
      return res.status(404).json({ mensagem: 'Relação não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Ano de ingresso atualizado com sucesso.', relacao: atualizada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar ano de ingresso.' });
  }
});

// Deletar relação
router.delete('/deletar', async (req, res) => {
  try {
    const { ra_pessoa, id_curso } = req.body;

    if (!ra_pessoa || !id_curso) {
      return res.status(400).json({ erro: 'ra_pessoa e id_curso são obrigatórios.' });
    }

    const deletada = await cursoPessoaDAO.deletarRelacaoCurPes(parseInt(ra_pessoa), parseInt(id_curso));
    if (!deletada) {
      return res.status(404).json({ mensagem: 'Relação não encontrada para exclusão.' });
    }

    res.status(200).json({ mensagem: 'Relação deletada com sucesso.', relacao: deletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar curso-pessoa.' });
  }
});

module.exports = router;
// FEITO
