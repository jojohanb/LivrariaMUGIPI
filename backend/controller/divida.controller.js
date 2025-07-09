const express = require('express');
const router = express.Router();
const dividaDAO = require('../model/divida.dao');

// Cadastrar dívida
router.post('/cadastrar', async (req, res) => {
  try {
    const { ra_pessoa, valor_divida, data_vencimento, status, id_livro } = req.body;

    if (!ra_pessoa || !valor_divida || !data_vencimento || !status || !id_livro) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const novaDivida = await dividaDAO.cadastrarDivida(
      parseInt(ra_pessoa),
      parseFloat(valor_divida),
      data_vencimento,
      status.trim(),
      parseInt(id_livro)
    );

    res.status(201).json({ mensagem: 'Dívida cadastrada com sucesso.', divida: novaDivida });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar dívida.', detalhes: erro.message });
  }
});

// Listar dívidas
router.get('/listar', async (req, res) => {
  try {
    const dividas = await dividaDAO.listarDividas();
    res.status(200).json({ dividas });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar dívidas.' });
  }
});

// Atualizar dívida
router.put('/:id', async (req, res) => {
  const id_divida = parseInt(req.params.id);
  const { valor_divida, data_vencimento, status } = req.body;

  if (!valor_divida || !data_vencimento || !status || isNaN(id_divida)) {
    return res.status(400).json({ erro: 'Dados inválidos para atualização.' });
  }

  try {
    const dividaAtualizada = await dividaDAO.atualizarDivida(
      id_divida,
      parseFloat(valor_divida),
      data_vencimento,
      status.trim()
    );

    if (!dividaAtualizada) {
      return res.status(404).json({ mensagem: 'Dívida não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Dívida atualizada com sucesso.', divida: dividaAtualizada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar dívida.', detalhes: erro.message });
  }
});

// Deletar dívida
router.delete('/deletar', async (req, res) => {
  try {
    const { id_divida } = req.body;

    if (!id_divida || isNaN(id_divida)) {
      return res.status(400).json({ erro: 'ID da dívida inválido.' });
    }

    const dividaDeletada = await dividaDAO.deletarDivida(parseInt(id_divida));

    if (!dividaDeletada) {
      return res.status(404).json({ mensagem: 'Dívida não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Dívida deletada com sucesso.', divida: dividaDeletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar dívida.', detalhes: erro.message });
  }
});

module.exports = router; // Exporta o router para ser usado no app principal
//FEITO