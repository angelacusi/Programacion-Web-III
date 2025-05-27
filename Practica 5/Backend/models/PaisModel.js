import conexion from '../config/bd.js';
export const Obtenerpaiss = async() => {
    const [pais] = await conexion.query('SELECT * FROM pais');
    return pais;
}
export const Crearpais = async(nombre, capital, continente) => {
    const [pais] = await conexion.query('INSERT INTO pais(nombre,capital,continente) VALUE(?,?,?)', [nombre, capital, continente])
    return { id: pais.insertId, nombre, capital, continente };
}
export const Actualizarpais = async (id, nombre, capital, continente) => {
    await conexion.query('UPDATE pais SET nombre = ?, capital = ?, continente = ? WHERE id_pais = ?', [nombre, capital, continente, id]);
    return { message: 'Se actualizó correctamente' };
}

export const Eliminarpais = async(id) => {
    await conexion.query('DELETE FROM pais WHERE id_pais = ?', [id]);
    return { message: 'Se elimino correctamente' };
}