const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const dataRouter = require('./app/v1/routes/dataRoute');
const authRoute = require('./app/v1/routes/authRoute');
const { connectToDatabase } = require('./app/config/DatabaseConfig');


const app = express();

const puerto = 3000;

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuracion del Endpoint
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas principales
app.use('/api/v1/data', dataRouter);
app.use('/api/v1/verification', authRoute);


// Ruta para verificar que el Endpoint funcione
app.get('/api', (req, res) => {
  res.send('Bienvenido a Dunkin MX.');
});

// Ruta por defecto para manejar URLs desconocidas
app.use((req, res) => {
  res.status(404).send('Página no encontrada.');
});

// Iniciar el servidor y hacer que escuche en el puerto especificado
app.listen(puerto, () => {
  connectToDatabase();
  console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});