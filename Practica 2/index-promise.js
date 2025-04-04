console.time('tiempo de ejecucion');


const mysql = require('mysql2/promise'); // Importa la versión con promesas

// Función asíncrona para manejar la conexión
async function Main() {
  try {
    // Crear conexión con promesas
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'testbd'
    });

    console.log(' Conexión exitosa con base de datos (promesas)');

    // Ejecutar una consulta
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    console.log('Resultados:', rows);

    // Cerrar la conexión
    await connection.end();
          // tiempo de ejecucion
  console.timeEnd('tiempo de ejecucion');
    console.log('🔌 Conexión cerrada');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);

  }
}

Main();
