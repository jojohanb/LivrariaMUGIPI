const express = require('express');
const router = express.Router();

router.get('/autores', 
    (req, res) => {
        return {"mensagem":"Hello World"}
    }
);

module.exports = router;