import conexion from '../config/bd.js';

export const ObtenerCiudades = async () => {
    const [ciudades] = await conexion.query('SELECT * FROM ciudad');
    return ciudades;
}

export const CrearCiudad = async (nombre, poblacion, region, id_pais) => {
    const [ciudad] = await conexion.query(
        'INSERT INTO ciudad(nombre, poblacion, region, id_pais) VALUES (?, ?, ?, ?)',
        [nombre, poblacion, region, id_pais]
    );
    return { id: ciudad.insertId, nombre, poblacion, region, id_pais };
}

export const ActualizarCiudad = async (id, nombre, poblacion, region, id_pais) => {
    await conexion.query(
        'UPDATE ciudad SET nombre = ?, poblacion = ?, region = ?, id_pais = ? WHERE id_ciudad = ?',
        [nombre, poblacion, region, id_pais, id]
    );
    return { message: 'Se actualizó correctamente' };
}

export const EliminarCiudad = async (id) => {
    await conexion.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id]);
    return { message: 'Se eliminó correctamente' };
}
