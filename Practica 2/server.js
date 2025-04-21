const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rutas para cada tipo de conexión

// Básica
app.get('/basic', (req, res) => {
  console.time('tiempoBasico');
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testbd'
  });

  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error en la conexión básica' });
    }
    console.timeEnd('tiempoBasico');
    res.json({ metodo: 'basic', usuarios: results });
    connection.end();
  });
});

// Conexión con Promesas
const mysqlPromise = require('mysql2/promise');

app.get('/promise', async (req, res) => {
  try {
    console.time('tiempoPromesa');
    const connection = await mysqlPromise.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'testbd'
    });

    const [rows] = await connection.execute('SELECT * FROM users');
    console.timeEnd('tiempoPromesa');
    res.json({ metodo: 'promise', usuarios: rows });
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: 'Error con promesas', detalle: error.message });
  }
});

// Pooling
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testbd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/pool', (req, res) => {
  console.time('tiempoPool');
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error con pooling' });
    }
    console.timeEnd('tiempoPool');
    res.json({ metodo: 'pool', usuarios: results });
  });
});

// Ruta para agregar usuario
app.post('/add-user', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  const query = 'INSERT INTO users (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';

  // Insertar usuario en base de datos
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testbd'
  });

  connection.query(query, [nombre, apellido, email, password], (err, results) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al insertar el usuario' });
    }

    // Realizar las consultas para obtener tiempos de ejecución
    const times = {};

    console.time('basic');
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Error en la consulta básica' });
      }
      console.timeEnd('basic');
      times.basic = console.timeLog('basic');

      // Promesas
      console.time('promise');
      mysqlPromise.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'testbd'
      }).then(async (connection) => {
        const [rows] = await connection.execute('SELECT * FROM users');
        console.timeEnd('promise');
        times.promise = console.timeLog('promise');

        // Pooling
        console.time('pool');
        pool.query('SELECT * FROM users', (err, results) => {
          if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error con pooling' });
          }
          console.timeEnd('pool');
          times.pool = console.timeLog('pool');
          
          res.json({ message: 'Usuario agregado con éxito', times });
        });
      });
    });

    connection.end();
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
