const mssql = require('mssql');

// Configuración de la conexión a SQL Server
const configProd = {
  user: 'Administrador',
  password: 'Dunk1nMx',
  server: 'dunkin.database.windows.net',
  database: 'DUNKINMX',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
}
const configDev = {
  user: 'usrInvitado',
  password: 'UsrInvitado123456',
  server: 'localhost\\SQLEXPRESS',
  database: 'DUNKINMX',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Crear un pool de conexiones
const pool = new mssql.ConnectionPool(configProd);
//export const pool = new mssql.ConnectionPool(configDev);

// Función para conectar a la base de datos
const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = {
    pool,
    connectToDatabase
}