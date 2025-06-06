const express = require('express');
const router = express.Router();
const autorDAO = require('../model/autor.dao');

//rota de teste
// router.get('/', (req, res) => {
//   res.send('Rota autor está funcionando!');
// });

// Rota para cadastrar autor
// 
router.post('/cadastrar', async (req, res) => {
  try {
    const novoAutor = {
      nome: req.body.nome
    };

    const autorCriado = await autorDAO.cadastrarAutor(novoAutor);
    res.status(201).json(autorCriado);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar autor' });
  }
});


module.exports = router;