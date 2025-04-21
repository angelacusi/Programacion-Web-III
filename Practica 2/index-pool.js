console.time('tiempo de ejecucion');

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public')); 
// Crear un pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testbd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// recibir el formulario y guardar el usuario
app.post('/add-user', (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  const query = 'INSERT INTO users (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
  pool.query(query, [nombre, apellido, email, password], (err, results) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al insertar el usuario' });
    }
    res.json({ message: 'Usuario agregado con éxito', id: results.insertId });
  });
});
app.get('/', (req, res) => {
  res.send('Página principal funcionando');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

  
  // tiempo de ejecucion
  console.timeEnd('tiempo de ejecucion');
