import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM empleado");

    res.json(rows);
};

export const getEmpleado = async (req, res) => {
    const {id} = req.params;
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

export const updateEmpleado = async (req, res) => {
    const {id} = req.params;
    const {nombre, salario} = req.body;
    const [result] = await pool.query('UPDATE empleado SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?', [nombre, salario, id]);

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Empleado no encontrado'
    });

    const [rows] = await pool.query('SELECT * FROM empleado WHERE id = ?', [id]);

    res.json(rows[0]);
};

export const deleteEmpleado = async (req, res) => {
    const {id} = req.params;
    const [rows] = await pool.query('DELETE FROM empleado WHERE id = ?', [id]);

    if(rows.affectedRows <= 0) return res.status(404).json({
        message: 'Empleado no encontrado'
    });

    res.send("El empleado con id " + id + " fue borrado exitosamente.");
};