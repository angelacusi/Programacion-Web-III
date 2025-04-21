console.time('tiempo de ejecucion');


// Importar el paquete mysql2
const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: '',      
  database: 'testbd' 
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos!');
  
  // Hacer una consulta simple
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error al hacer la consulta:', err);
      return;
    }
    console.log('Usuarios:', results); // Mostrar los resultados de la consulta

      // tiempo de ejecucion
  console.timeEnd('tiempo de ejecucion');
  });

  // Cerrar la conexión
  connection.end();
});
