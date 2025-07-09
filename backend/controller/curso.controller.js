const express = require('express');
const router = express.Router();
const cursoDAO = require('../model/curso.dao');

// Cadastrar curso
router.post('/cadastrar', async (req, res) => {
  try {
    const { nome_curso } = req.body;
    if (!nome_curso || nome_curso.trim() === '') {
      return res.status(400).json({ error: 'Nome do curso é obrigatório.' });
    }
    const cursoCriado = await cursoDAO.cadastrarCurso(nome_curso.trim());
    res.status(201).json({ message: 'Curso cadastrado com sucesso.', curso: cursoCriado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar curso.', detalhes: erro.message });
  }
});

// Listar cursos
router.get('/listar', async (req, res) => {
  try {
    const cursos = await cursoDAO.listarCurso();
    res.status(200).json({ cursos });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao listar cursos.' });
  }
});

// Atualizar curso
router.put('/:id', async (req, res) => {
  const id_curso = parseInt(req.params.id);
  const { nome_curso } = req.body;

  if (!nome_curso || isNaN(id_curso)) {
    return res.status(400).json({ mensagem: 'Nome e ID válidos são obrigatórios.' });
  }

  try {
    const cursoAtualizado = await cursoDAO.atualizarCurso(nome_curso.trim(), id_curso);
    if (!cursoAtualizado) {
      return res.status(404).json({ mensagem: 'Curso não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Curso atualizado com sucesso.', curso: cursoAtualizado });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar curso.', erro: erro.message });
  }
});

// Deletar curso
router.delete('/deletar', async (req, res) => {
  try {
    const { nome_curso } = req.body;
    if (!nome_curso || nome_curso.trim() === '') {
      return res.status(400).json({ erro: 'Nome do curso é obrigatório para deletar.' });
    }
    const cursoDeletado = await cursoDAO.deletarCurso(nome_curso.trim());
    if (!cursoDeletado) {
      return res.status(404).json({ mensagem: 'Curso não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Curso deletado com sucesso.', curso: cursoDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar curso.', detalhes: erro.message });
  }
});

module.exports = router; // Exporta o router para ser usado no app principal
//FEITO