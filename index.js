const express = require('express');
const app = express();

const puerto = 3000;

// Rutas principales
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esta es la página de inicio.');
});

app.get('/otra-pagina', (req, res) => {
  res.send('Bienvenido a otra página. Aquí puedes agregar más contenido.');
});

// Ruta por defecto para manejar URLs desconocidas
app.use((req, res) => {
  res.status(404).send('Página no encontrada.');
});

// Iniciar el servidor y hacer que escuche en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});