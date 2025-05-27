import express from 'express';
import cors from 'cors';

import paisRoutes from './routes/PaisRoutes.js';
import ciudadRoutes from './routes/CiudadRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas para país y ciudad
app.use('/api/pais', paisRoutes);
app.use('/api/ciudad', ciudadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
