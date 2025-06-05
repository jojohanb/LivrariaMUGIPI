const dbConfig = require('../dbConfig');
const pgPool = dbConfig.pgPool;

async function create(nome){
    const query = "INSERT INTO AUTORES(nome) VALUES($1)";
    let values = [nome]
    try{
        await pgPool.query(query, values);
        return;
    } catch(error){
        console.log('Erro ao criar autor, função create(nome) do autor', error);
        throw error;
    }
}

async function list(){
    const query = "SELECT nome from AUTORES";
    try{
        let result = await pgPool.query(query);
        return result.rows;
    }catch(error){
        console.log('Erro ao listar autores, list() do autor');
        throw error;
    }
}

module.exports = {create, list};