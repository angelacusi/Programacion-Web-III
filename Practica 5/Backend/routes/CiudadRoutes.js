import express from 'express';
import { 
    obtenerCiudades, 
    crearCiudad, 
    actualizarCiudad, 
    eliminarCiudad 
} from '../controllers/CiudadController.js';

const routes = express.Router();

routes.get('/', obtenerCiudades);
routes.post('/', crearCiudad);
routes.put('/:id_ciudad', actualizarCiudad);
routes.delete('/:id_ciudad', eliminarCiudad);

export default routes;
