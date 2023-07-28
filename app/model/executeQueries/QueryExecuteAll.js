const pool = require('../../config/DatabaseConfig');

const executeQueryAll = async (query) => {
    let poolConnection;

    try {
        poolConnection = await pool.connect();
        const result = await poolConnection.query(query);

        if (result.recordset.length === 0) {
            return null;
        }

        const data = result.recordset;
        return data;

    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
        pool.close();
        throw error;
    } finally {
        //pool.close();
        if (poolConnection) {
            poolConnection.release();
        }
    }
};

module.exports = {
    executeQueryAll
}