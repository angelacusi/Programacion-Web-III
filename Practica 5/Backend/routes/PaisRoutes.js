import express from 'express';
import { obtenerpaises, Crearpaiss, Actualizarpaiss, Eliminarpaiss } from '../controllers/PaisController.js';
const routes = express.Router();

routes.get('/', obtenerpaises);
routes.post('/', Crearpaiss);
routes.put('/:id_pais', Actualizarpaiss);
routes.delete('/:id_pais', Eliminarpaiss);
export default routes;


