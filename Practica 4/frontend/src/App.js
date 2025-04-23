import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

function App() {
  //usamos variables de estado, define el estado qu eun componente puede tener en react. 
  const [productos,setProductos] = useState([]); //array vacio
  const [formularioAgregar, SetAgregarProducto]=useState({
    modelo:'',
    color:'',
    tallas:'',
    precio:'',
    stock:''
  });

  const [formularioEditar, SetEditarProducto]=useState({
    modelo:'',
    color:'',
    tallas:'',
    precio:'',
    stock:''
  });

  const [productoId,setProductoId]=useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mostrar, setMostrar] = useState(false);
  const cerrarModal = () => setMostrar(false);
  const AbrirModal = () => setMostrar(true);
  
  const fetchproductos =useCallback(async()=>{
    try{
      const respuesta= await fetch('http://localhost:3001/api/productos');
      const data= await respuesta.json();
      setProductos(data);
    }catch(error){
        alert('ERROR'+error);
    }
  },[]); //cuando se carguen los componentes llame una sola vez a la funcion y no varias veces
  
  useEffect(()=>{ //usara otravez esa funcion cuando se modifique?
    fetchproductos();
  },[fetchproductos]);

  const Agregar=async(e)=>{
  e.preventDefault();
  const {modelo, color, tallas, precio, stock} = formularioAgregar;
  if(!modelo.trim() || !color.trim() || !tallas.trim() ||  !stock.trim()){
    alert('llenar todos los campos');
    return;
  }
   //validacion de los numeros enteros
  if (isNaN(precio) || isNaN(stock) || Number(precio) <= 0 || Number(stock) < 0) {
    alert('Precio y stock deben ser números válidos');
    return;
  }

  try{
    //envia la informacion a nuestro servidor
    const respuesta=await fetch(`http://localhost:3001/api/productos`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        ...formularioAgregar
      })
    });
    if(!respuesta.ok){
      let errorMensaje ='error al cargar'; //let se usa dentro de bucles y condicionales
      try{
        const error=await respuesta.json();
        errorMensaje=error.message || errorMensaje
      }catch {
        console.error(errorMensaje);
      }
      throw new Error(errorMensaje);
    }
    handleClose();
    Swal.fire({
      title: "se agrego correctamente el producto",
      icon: "success",
      draggable: true,
      timer: 2000
    });
    fetchproductos();

  }catch(error){
    console.error(error);
    Swal.fire({
      title: "no se pudo agregar el producto",
      icon: "error",
      draggable: true,
      timer: 2000
    });
  }
};

const EditarProductos=(producto)=>{
  SetEditarProducto({
    modelo: producto.modelo,
    color: producto.color,
    tallas: producto.tallas,
    precio: producto.precio,
    stock: producto.stock
  });
  setProductoId(producto.id);
  AbrirModal();
}

const CambiosFormularioAgregar=async(e)=>{
  SetAgregarProducto({
    ...formularioAgregar, //hace una copia de la variable de estado, para mas de un campo
    [e.target.name]:e.target.value //variable de estado
    
  });
}

const cambiosFormularioEditar=(e)=>{
  SetEditarProducto({
    ...formularioEditar,
    [e.target.name]: e.target.value
  })
}

const EditarProducto=async(e)=>{  //el async va de la mano con el await por el uso de promesas
  e.preventDefault();
  const {modelo, color, tallas, precio, stock} = formularioEditar;    if(!modelo.trim() || !color.trim() || !tallas.trim() ||  !stock.trim()){
    alert('llenar todos los campos');
    return;
  }
   //validacion de los numeros enteros
  if (isNaN(precio) || isNaN(stock) || Number(precio) <= 0 || Number(stock) < 0) {
    alert('Precio y stock deben ser números válidos');
    return;
  }

  try{
    //envia la informacion a nuestro servidor
    const respuesta=await fetch(`http://localhost:3001/api/productos/${productoId}`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        ...formularioEditar
      })
    });
    if(!respuesta.ok){
      let errorMensaje ='error al cargar'; //let se usa dentro de bucles y condicionales
      try{
        const error=await respuesta.json();
        errorMensaje=error.message || errorMensaje
      }catch {
        console.error(errorMensaje);
      }
      throw new Error(errorMensaje);
    }
    cerrarModal();
    Swal.fire({
      title: "se edito correctamente el producto",
      icon: "success",
      draggable: true,
      timer: 2000
    });
    fetchproductos();
  
  }catch(error){
    console.error(error);
    Swal.fire({
      title: "no se pudo editar el producto",
      icon: "error",
      draggable: true,
      timer: 2000
    });
  }
}

const EliminarProductos=async(id)=>{
  Swal.fire({
    title: "¿Está seguro de eliminar este registro?",
    text: "no se podra recuperar!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "si, eliminar!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      try{
        await fetch(`http://localhost:3001/api/productos/${id}`,{
          method:`DELETE`
        });
        Swal.fire({
          title: "Eliminado!",
          icon: "success",
          timer: 2000
        });
        fetchproductos();
      }catch(error){
        Swal.fire({
          title: "no se pudo eliminar el producto!",
          icon: "success",
          timer: 2000
        });
      }
    }
  });
}

  return (
    //siempre debe estar dentro de un contenedor
    <div className="contenedor"> 
      <h1>CRUD- REACT</h1>
      <h2>base de datos : Calzados</h2>
      <hr></hr>
      <Button variant="info" onClick={handleShow} >Crear</Button>
      <hr></hr>

      <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>modelo</th>
            <th>color</th>
            <th>tallas</th>
            <th>precio</th>
            <th>stock</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto=>( //mapeo, esta iterando
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.modelo}</td>
              <td>{producto.color}</td>
              <td>{producto.tallas}</td>
              <td>{producto.precio}.Bs</td>
              <td>{producto.stock}</td>
              <td>
                <Button variant="warning" onClick={()=>{EditarProductos(producto)}}>editar</Button>
                <Button variant="danger" onClick={()=>{EliminarProductos(producto.id)}}>eliminar</Button>
              </td>
          </tr>
          ))}
          
        </tbody>
      </Table>
      
      {/*modal para agregar*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo registro </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Modelo"
                name='modelo'
                onChange={CambiosFormularioAgregar}//cuando dejas el label. un evento que hace llamado a una funcion
                value={formularioAgregar.modelo}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Color"
                name="color"
                onChange={CambiosFormularioAgregar}
                value={formularioAgregar.color}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tallas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tallas"
                name="tallas"
                onChange={CambiosFormularioAgregar}
                value={formularioAgregar.tallas}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                name="precio"
                onChange={CambiosFormularioAgregar}
                value={formularioAgregar.precio}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock"
                name="stock"
                onChange={CambiosFormularioAgregar}
                value={formularioAgregar.stock}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Agregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      

      {/*modal para editar*/}
      <Modal show={mostrar} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar registro </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Modelo"
                name='modelo'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.modelo}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Color"
                name="color"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.color}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tallas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tallas"
                name="tallas"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.tallas}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                name="precio"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.precio}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock"
                name="stock"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.stock}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={EditarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;