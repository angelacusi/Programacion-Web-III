//con el type model de json podemos hacerlo de una forma mas actual:

import mysql from 'mysql2';
const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'bd_tienda_product'
}).promise();  

export default pool; //exporta la constante pool para usarlo de fuera