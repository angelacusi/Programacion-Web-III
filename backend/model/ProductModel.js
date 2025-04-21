//realizamos las consultas
import pool from "../config/db.js"; // importa el pool que fue exportado

export const obtenerTodosProductos=async()=>{
    const [array]= await pool.query('SELECT * FROM calzados');
    return array;
}//exportamos para usarlo en controller, asi enviar todos los registros de la base de datos

export const crearNuevoProducto=async({ modelo, color, tallas, precio, stock })=>{
    const resultado = await pool.query('INSERT INTO calzados(modelo, color, tallas, precio, stock) VALUES(?, ?, ?, ?, ?)', [modelo, color, tallas, precio, stock]);
    return resultado.insertId;
}

// metodo PUT para enviar la informacion actualizada pero con el id atravez del url
export const ActualizarProducto=async({id, modelo, color, tallas, precio, stock })=>{
    await pool.query(
        'UPDATE calzados SET modelo = ?, color = ?, tallas = ?, precio = ?, stock = ? WHERE id = ?',
        [modelo, color, tallas, precio, stock, id]);
};

export const buscarProducto=async(id)=>{
    const [array]=await pool.query('SELECT * FROM calzados WHERE ID=?', [id]);
    return array[0]

}

export const EliminarProductos=async(id)=>{
    await pool.query('DELETE FROM calzados WHERE id=?', [id]);
}