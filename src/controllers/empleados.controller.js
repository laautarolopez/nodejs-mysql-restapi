import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM empleado");
        res.json(rows);
    } catch(error) {
        return res.status(500).json({
            message: "Algo salió mal"
        });
    }

};

export const getEmpleado = async (req, res) => {
    const {id} = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM empleado WHERE id = ?', [id]);

        if(rows.length <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        });

        res.json(rows[0]);
    } catch(error) {
        return res.status(500).json({
            message: "Algo salió mal"
        });
    }
}

export const createEmpleado = async (req, res) => {
    const { nombre, salario } = req.body;

    try {
        const [rows] = await pool.query("INSERT INTO empleado (nombre, salario) VALUES (?, ?)", [nombre, salario])

        res.send({
            id: rows.insertId,
            nombre,
            salario
        });
    } catch(error) {
        return res.status(500).json({
            message: "Algo salió mal"
        });
    }
};

export const updateEmpleado = async (req, res) => {
    const {id} = req.params;
    const {nombre, salario} = req.body;

    try {
        const [result] = await pool.query('UPDATE empleado SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?', [nombre, salario, id]);

        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        });

        const [rows] = await pool.query('SELECT * FROM empleado WHERE id = ?', [id]);

        res.json(rows[0]);
    } catch(error) {
        return res.status(500).json({
            message: "Algo salió mal"
        });
    }
};

export const deleteEmpleado = async (req, res) => {
    const {id} = req.params;
    
    try {
        const [rows] = await pool.query('DELETE FROM empleado WHERE id = ?', [id]);

        if(rows.affectedRows <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        });

        res.send("El empleado con id " + id + " fue borrado exitosamente.");
    } catch(error) {
        return res.status(500).json({
            message: "Algo salió mal"
        });
    }
};