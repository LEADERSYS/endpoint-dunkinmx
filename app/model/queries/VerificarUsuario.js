const query_db = require('../executeQueries/QueryExecuteAll');

async function existeUsuario(id) {
    const queryIDusuario = "SELECT CASE WHEN EXISTS" + 
        "(SELECT 1 FROM usuario WHERE id = " + id +")" +
        "THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS user_exists";
    
    let existeUsuario = await query_db.executeQuery(queryIDusuario);

    return existeUsuario.user_exists;
}

module.exports = {
    existeUsuario
}