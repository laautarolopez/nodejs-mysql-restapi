import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM empleado");
    res.json(rows);
};

export const getEmpleado = async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM empleado WHERE id = ?', [id]);

    if(rows.length <= 0) return res.status(404).json({
        message: 'Empleado no encontrado'
    });

    res.json(rows[0]);
}

export const createEmpleado = async (req, res) => {
    const { nombre, salario } = req.body;
    const [rows] = await pool.query("INSERT INTO empleado (nombre, salario) VALUES (?, ?)", [nombre, salario])
    res.send({
        id: rows.insertId,
        nombre,
        salario
    });
};

export const updateEmpleado = (req, res) => res.send('actualizando empleados');

export const deleteEmpleado = (req, res) => res.send('eliminando empleados');