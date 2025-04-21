//
import * as Producto from '../model/ProductModel.js';

export const obtenerProductos=async(req,res)=>{

    try{
        const productos= await Producto.obtenerTodosProductos();
        res.status(200).json(productos);
    }catch(error){
        res.status(500).json({message:'error al obtener productos', error:error.message});
    }
}

export const crearProducto =async(req, res)=>{
    try{
        const {modelo, color, tallas, precio, stock }= req.body; //estamos haciendo un POST , que se envia atravez del contenido body

        const newProducto=await Producto.crearNuevoProducto({modelo, color, tallas, precio, stock});
        res.status(201).json({id:newProducto,message:'Producto creado'});
    }catch(error){
        res.status(500),json({message:'error al cargar el producto', error: error.message});
    }
}

export const ActualizarNuevoProducto=async(req,res)=>{
    try{
    const {id}=req.params;
    const buscar=await Producto.buscarProducto(id);
    if(!buscar) 
        return res.status(404).json({message:'producto no encontrado'});
    const {modelo, color, tallas, precio, stock }= req.body; //estamos haciendo un POST , que se envia atravez del contenido body

    await Producto.ActualizarProducto({id, modelo, color, tallas, precio, stock})
    res.status(200).json({message: 'producto actualizado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'error al actualizar producto', error:error.message});
    }
}

export const ELiminarProducto=async(req, res)=>{
    try{
        const {id}=req.params;
        const buscar=await Producto.buscarProducto(id);
        if(!buscar) return res.status(404).json({message:'producto no encontrado'});
        await Producto.EliminarProductos(id);
        res.status(200).json({message: 'producto eliminado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'error al eliminar producto', error:error.message});
    }
}