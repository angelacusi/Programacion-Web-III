import express from 'express';
import rutas from './routes/routes.js';
import cors from 'cors';
const app=express();
const PORT=3001;
app.use(express.json());

app.use(cors({origin: 'http://localhost:3000'}));
app.use('/api',rutas);// una forma mas extructurada de manejar las rutas
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})