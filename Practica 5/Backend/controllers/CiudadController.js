import * as CiudadModel from '../models/CiudadModel.js';

export const obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await CiudadModel.ObtenerCiudades();
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearCiudad = async (req, res) => {
    try {
        const { nombre, poblacion, region, id_pais } = req.body;

        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        const regionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;

        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido' });
        }

        if (!regionRegex.test(region)) {
            return res.status(400).json({ error: 'Región inválida' });
        }

        const ciudad = await CiudadModel.CrearCiudad(nombre, poblacion, region, id_pais);
        res.status(201).json(ciudad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const actualizarCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const { nombre, poblacion, region, id_pais } = req.body;

        // Validaciones
        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        const regionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;

        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido' });
        }

        if (!regionRegex.test(region)) {
            return res.status(400).json({ error: 'Región inválida' });
        }

        const ciudad = await CiudadModel.ActualizarCiudad(id_ciudad, nombre, poblacion, region, id_pais);
        res.status(200).json(ciudad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const eliminarCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const ciudad = await CiudadModel.EliminarCiudad(id_ciudad);
        res.status(200).json(ciudad);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
