import { Router } from "express";
import {getEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

router.get('/empleados', getEmpleados);

router.get('/empleados/:id', getEmpleado);

router.post('/empleados', createEmpleado);

router.put('/empleados', updateEmpleado);

router.delete('/empleados', deleteEmpleado);

export default router;