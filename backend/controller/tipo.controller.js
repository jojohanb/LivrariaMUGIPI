const express = require('express');
const router = express.Router();
const tipoDAO = require('../model/tipo.dao');

// Cadastrar tipo
router.post('/cadastrar', async (req, res) => {
  try {
    const { tipo_id, descricao } = req.body;

    if (tipo_id === undefined || !descricao || descricao.trim() === '') {
      return res.status(400).json({ error: 'ID e descrição são obrigatórios.' });
    }

    const tipoCriado = await tipoDAO.cadastrarTipo(parseInt(tipo_id), descricao.trim());
    res.status(201).json({ message: 'Tipo criado com sucesso!', tipo: tipoCriado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar tipo.' });
  }
});


// Listar tipos
router.get('/listar', async (req, res) => {
  try {
    const tipos = await tipoDAO.listarTipos();
    res.status(200).json({ tipos });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar tipos.' });
  }
});

// Atualizar tipo
router.put('/:id', async (req, res) => {
  const tipo_id = parseInt(req.params.id);
  const { descricao } = req.body;

  if (!descricao || isNaN(tipo_id)) {
    return res.status(400).json({ mensagem: 'Id e descrição válidos são obrigatórios.' });
  }

  try {
    const tipoAtualizado = await tipoDAO.atualizarTipo(descricao.trim(), tipo_id);
    if (!tipoAtualizado) {
      return res.status(404).json({ mensagem: 'Tipo não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Tipo atualizado com sucesso.', tipo: tipoAtualizado });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar tipo.', erro: erro.message });
  }
});

// Deletar tipo
router.delete('/deletar', async (req, res) => {
  try {
    const { tipo_id } = req.body;
    if (!tipo_id || isNaN(tipo_id)) {
      return res.status(400).json({ erro: 'ID é obrigatório e deve ser um número.' });
    }

    const tipoDeletado = await tipoDAO.deletarTipo(parseInt(tipo_id));
    if (!tipoDeletado) {
      return res.status(404).json({ mensagem: 'Tipo não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Tipo deletado com sucesso.', tipo: tipoDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar tipo.' });
  }
});

module.exports = router;
//FEITO