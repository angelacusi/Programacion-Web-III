import { Router } from "express";
import { obtenerProductos, crearProducto, ActualizarNuevoProducto, ELiminarProducto} from "../controller/ProductController.js";

const router=Router();

router.get('/productos', obtenerProductos);
router.post('/productos', crearProducto); //post porque queremos guardar algo en la base de datos
router.put('/productos/:id', ActualizarNuevoProducto);  //put 
router.delete('/productos/:id', ELiminarProducto);
export default router;