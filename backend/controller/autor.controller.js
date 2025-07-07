const express = require('express');
const router = express.Router();
const autorDAO = require('../model/autor.dao');

// ROTA PARA CADASTRAR UM AUTOR
router.post('/cadastrar', async (req, res) => {
  try {
    if (!('nome' in req.body) || req.body.nome.trim() === '') {
      return res.status(400).json({ 'error': 'Nome faltando no autor' });
    }
    const autorCriado = await autorDAO.cadastrarAutor(req.body.nome.trim());
    res.status(201).json({ 'message': 'ok' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de cadastro de autor do controller' });
  }
});

// ROTA DE LISTAGEM DE TODOS OS AUTORES
router.get('/listar', async (req, res) => {
  try {
    const autores = await autorDAO.listarAutores();
    res.status(200).json({ 'autores': autores });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar autores' });
  }
});

// ROTA DE ATUALIZAR OS AUTORES
router.put('/:id', async (req, res) => {
  const id_autor = parseInt(req.params.id);
  const { nome } = req.body;

  if (!nome || isNaN(id_autor)) {
    return res.status(400).json({ mensagem: 'Nome e ID válidos são obrigatórios.' });
  }

  try {
    const autorAtualizado = await autorDAO.atualizarAutores(nome.trim(), id_autor);
    if (!autorAtualizado) {
      return res.status(404).json({ mensagem: 'Autor não encontrado.' });
    }
    res.status(200).json(autorAtualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar autor.', erro: erro.message });
  }
});

// ROTA DE DELETAR OS AUTORES
router.delete('/deletar', async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ erro: 'Nome do autor é obrigatório para deletar.' });
    }
    const autorDeletado = await autorDAO.deletarAutores(nome.trim());
    if (!autorDeletado) {
      return res.status(404).json({ mensagem: 'Autor não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Autor deletado com sucesso.', autor: autorDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na função de deletar autor do controller.' });
  }
});

module.exports = router;

//FEITO