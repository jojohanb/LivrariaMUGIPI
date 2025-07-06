const express = require('express');
const router = express.Router();
const tipoDAO = require('../model/tipo.dao');

// ROTA PARA CADASTRAR UM TIPO
router.post('/cadastrar', async (req, res) => {
  try {
    if (!('descricao' in req.body) || req.body.descricao.trim() === '') {
      return res.status(400).json({ error: 'Crie um tipo válido.' });
    }
    const tipoCriado = await editoraDAO.cadastrarTipo(req.body.descricao.trim());
    res.status(201).json({ message: 'Tipo criado com sucesso!', tipo: tipoCriado }); // MELHORIA
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de cadastro de tipo do controller.' });
  }
});

// ROTA DE LISTAGEM DE TODOS OS TIPOS
router.get('/listar', async (req, res) => {
  try {
    const tipo = await tipoDAO.listarTipo();
    res.status(200).json({ tipo });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar tipos' });
  }
});

// ROTA DE ATUALIZAR OS TIPOS
router.put('/:id', async (req, res) => {
  const tipo_id = parseInt(req.params.id);
  const { descricao } = req.body;

  if (!descricao || isNaN(tipo_id)) {
    return res.status(400).json({ mensagem: 'Id e desc válidos são obrigatórios.' });
  }

  try {
    const tipoAtualizado = await tipoDAO.atualizarTipo(descricao.trim(), tipo_id);
    if (!tipoAtualizado) {
      return res.status(404).json({ mensagem: 'Tipo não encontrado.' });
    }
    res.status(200).json(tipoAtualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar tipo.', erro: erro.message });
  }
});

// ROTA DE DELETAR OS TIPOS
router.delete('/deletar', async (req, res) => {
  try {
    const { tipo_id } = req.body;
    if (!tipo_id || tipo_id.trim() === '') {
      return res.status(400).json({ erro: 'id é obrigatório para deletar.' });
    }
    const tipoDeletado = await tipoDAO.deletarTipo(descricao.trim());
    if (!tipoDeletado) {
      return res.status(404).json({ mensagem: 'Tipo não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Tipo deletado com sucesso.', tipo: tipoDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de deletar tipo do controller.' });
  }
});

module.exports = router;
