const express = require('express');
const router = express.Router();
const editoraDAO = require('../model/editora.dao');

// ROTA PARA CADASTRAR UMA EDITORA
router.post('/cadastrar', async (req, res) => {
  try {
    if (!('nome_editora' in req.body) || req.body.nome_editora.trim() === '') {
      return res.status(400).json({ error: 'Nome da editora é obrigatório.' });
    }
    const editoraCriada = await editoraDAO.cadastrarEditora(req.body.nome_editora.trim());
    res.status(201).json({ message: 'Editora criada com sucesso!', editora: editoraCriada }); 
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de cadastro de editora do controller.' });
  }
});

// ROTA DE LISTAGEM DE TODAS AS EDITORAS
router.get('/listar', async (req, res) => {
  try {
    const editora = await editoraDAO.listarEditora();
    res.status(200).json({ editora });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar editora' });
  }
});

// ROTA DE ATUALIZAR AS EDITORAS
router.put('/:id', async (req, res) => {
  const id_editora = parseInt(req.params.id);
  const { nome_editora } = req.body;

  if (!nome_editora || isNaN(id_editora)) {
    return res.status(400).json({ mensagem: 'Nome e ID válidos são obrigatórios.' });
  }

  try {
    const editoraAtualizado = await editoraDAO.atualizarEditora(nome_editora.trim(), id_editora);
    if (!editoraAtualizado) {
      return res.status(404).json({ mensagem: 'Editora não encontrada.' });
    }
    res.status(200).json(editoraAtualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar editora.', erro: erro.message });
  }
});

// ROTA DE DELETAR AS EDITORAS
router.delete('/deletar', async (req, res) => {
  try {
    const { nome_editora } = req.body;
    if (!nome_editora || nome_editora.trim() === '') {
      return res.status(400).json({ erro: 'Nome da editora é obrigatório para deletar.' });
    }
    const editoraDeletada = await editoraDAO.deletarEditora(nome_editora.trim());
    if (!editoraDeletada) {
      return res.status(404).json({ mensagem: 'Editora não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Editora deletada com sucesso.', editora: editoraDeletada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de deletar editora do controller.' });
  }
});

module.exports = router; // Exporta o router para ser usado no app principal

//FEITO
