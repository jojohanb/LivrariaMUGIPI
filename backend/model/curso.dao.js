const db = require("../config/database");
const cadastrarCurso = async function (nome_curso) {
  try {
    const sql = 'INSERT INTO curso (nome_curso) VALUES ($1) RETURNING *';
    const valores = [nome_curso];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0]; // ← Agora retorna o curso criado
  } catch (erro) {
    console.error('Erro ao cadastrar na função cadastrarCurso do model:', erro.message, erro.stack);
    throw erro;
  }
};


//Responsavel por listar os cursos do banco de dados
const listarCurso = async function () {
    const sql = 'SELECT id_curso, nome_curso FROM CURSO';
    try{
      const resultado = await db.query(sql);
      return resultado.rows;
    } catch(erro){
      console.error('Erro ao listar os cursos', erro.message, erro.stack);
      throw erro;
    }
    
}
//Responsavel por atualizar os cursos do banco de dados
const atualizarCurso = async function (nome_curso, id_curso) {
  try {
    const sql = 'UPDATE curso SET nome_curso = $1 WHERE id_curso = $2 RETURNING *';
    const valores = [nome_curso, id_curso];
    const resultado = await db.query(sql, valores);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Erro ao atualizar na função atualizarCurso do model:', erro.message, erro.stack);
    throw erro;
  }
};

//Responsavel por deletar os cursos do banco de dados
const deletarCurso = async function (nome_curso) {
    try {
    const sql = 'DELETE FROM curso WHERE nome_curso=$1 RETURNING *';
    const valores = [nome_curso];
    const resultado = await db.query(sql, valores);

    if (resultado.rowCount === 0){
      console.log('Nenhum curso encontrado com esse nome')
      return null;
    }
    console.log('Curso deletado com sucesso:',resultado.rows[0]);
    return resultado.rows[0]
  } catch (erro) {
    console.error('Erro ao deletar Curso na função de deletarCurso do model:', erro.message, erro.stack);
    throw erro;
  }
  
}


module.exports = { cadastrarCurso, listarCurso, atualizarCurso, deletarCurso }
//FEITO