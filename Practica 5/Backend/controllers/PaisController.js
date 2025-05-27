import * as PaisModel from '../models/PaisModel.js';

export const obtenerpaises = async(req, res) => {
    try {
        const paiss = await PaisModel.Obtenerpaiss();
        res.json(paiss);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const Crearpaiss = async(req, res) => {
        try {
        const { nombre, capital, continente } = req.body;

        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;
        const capitalRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;

        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido' });
        }

        if (!capitalRegex.test(capital)) {
            return res.status(400).json({ error: 'Capital inválida' });
        }

        const pais = await PaisModel.Crearpais(nombre, capital, continente);
        res.status(201).json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const Actualizarpaiss = async (req, res) => {
    try {
        const { id_pais} = req.params;
        const { nombre, capital, continente } = req.body;
        const pais = await PaisModel.Actualizarpais(id_pais, nombre, capital, continente);
        res.status(200).json(pais); // 200 OK es mejor para updates
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const Eliminarpaiss = async(req, res) => {
    try {
        const { id_pais} = req.params;
        const pais = await PaisModel.Eliminarpais(id_pais);
        res.status(201).json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}