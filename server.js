const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      
    password: '1831',      
    database: 'gestionautobuses'
});

// 1. Leer (GET)
app.get('/api/autobuses', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Autobuses');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Crear (POST)
app.post('/api/autobuses', async (req, res) => {
    try {
        const { placa, marca, capacidad } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Autobuses (placa, marca, capacidad) VALUES (?, ?, ?)',
            [placa, marca, capacidad]
        );
        res.status(201).json({ id: result.insertId, placa, marca, capacidad });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Actualizar (PUT)
app.put('/api/autobuses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { placa, marca, capacidad } = req.body;
        await pool.query(
            'UPDATE Autobuses SET placa = ?, marca = ?, capacidad = ? WHERE id = ?',
            [placa, marca, capacidad, id]
        );
        res.json({ message: 'Autobús actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Eliminar (DELETE)
app.delete('/api/autobuses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM Autobuses WHERE id = ?', [id]);
        res.json({ message: 'Autobús eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor backend corriendo en http://localhost:3000');
});