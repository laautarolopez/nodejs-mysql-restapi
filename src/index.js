import express from 'express';
import empleadosRoutes from './routes/empleados.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.use('/api', indexRoutes);
app.use('/api', empleadosRoutes);

app.listen(3000);