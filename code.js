const express = require('express');
const cors = require('cors');
const connection = require('./conection');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PUERTO = 3020;

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API CREATE tabla: restaurante PUBLICAR [POST]
app.post('/api/restaurantes', async (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    try {
        const result = await connection.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el restaurante', error: err.message });
    }
});
// API READ tabla: restaurante OBTENER [GET]
app.get('/api/restaurantes', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM restaurante');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// API UPDATE tabla: restaurante ACTUALIZAR [PUT]
app.put('/api/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *';
    try {
        const result = await connection.query(query, [nombre, ciudad, direccion, fecha_apertura, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `No se encontró restaurante con ID ${id}` });
        }
        res.status(200).json({ success: true, updated: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// API DELETE tabla: restaurante ELIMINAR [DELETE]
app.delete('/api/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM restaurante WHERE id_rest = $1 RETURNING *';
    try {
        const result = await connection.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `No existe restaurante con ID ${id}` });
        }
        res.status(200).json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API CREATE tabla: empleado PUBLICAR [POST]
app.post('/api/empleados', async (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;
    const query = 'INSERT INTO empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4) RETURNING *';
    try {
        const result = await connection.query(query, [id_empleado, nombre, rol, id_rest]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el empleado', error: err.message });
    }
});
// API READ tabla: empleado OBTENER [GET]
app.get('/api/empleados', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM empleado');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// API UPDATE tabla: empleado ACTUALIZAR [PUT]
app.put('/api/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    const query = 'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *';
    try {
        const result = await connection.query(query, [nombre, rol, id_rest, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `No se encontró empleado con ID ${id}` });
        }
        res.status(200).json({ success: true, updated: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// API DELETE tabla: empleado ELIMINAR [DELETE]
app.delete('/api/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM empleado WHERE id_empleado = $1 RETURNING *';
    try {
        const result = await connection.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Empleado con ID ${id} no existe` });
        }
        res.status(200).json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API CREATE tabla: producto PUBLICAR [POST]
app.post('/api/productos', async (req, res) => {
    const { id_prod, nombre, precio } = req.body;
    const query = 'INSERT INTO producto (id_prod, nombre, precio) VALUES ($1, $2, $3) RETURNING *';
    try {
        const result = await connection.query(query, [id_prod, nombre, precio]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el producto', error: err.message });
    }
});
// API READ tabla: producto OBTENER [GET]
app.get('/api/productos', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM producto');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// API UPDATE tabla: producto ACTUALIZAR [PUT]
app.put('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const query = 'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *';
    try {
        const result = await connection.query(query, [nombre, precio, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado` });
        }
        res.status(200).json({ success: true, updated: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// API DELETE tabla: producto ELIMINAR [DELETE]
app.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM producto WHERE id_prod = $1 RETURNING *';
    try {
        const result = await connection.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Producto con ID ${id} no existe` });
        }
        res.status(200).json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API CREATE tabla: pedido PUBLICAR [POST]
app.post('/api/pedidos', async (req, res) => {
    const { id_pedido, fecha, id_rest, total } = req.body;
    const query = 'INSERT INTO pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4) RETURNING *';
    try {
        const result = await connection.query(query, [id_pedido, fecha, id_rest, total]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el pedido', error: err.message });
    }
});
// API READ tabla: pedido OBTENER [GET]
app.get('/api/pedidos', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM pedido');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// API UPDATE tabla: pedido ACTUALIZAR [PUT]
app.put('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    const query = 'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *';
    try {
        const result = await connection.query(query, [fecha, id_rest, total, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Pedido con ID ${id} no encontrado` });
        }
        res.status(200).json({ success: true, updated: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// API DELETE tabla: pedido ELIMINAR [DELETE]
app.delete('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM pedido WHERE id_pedido = $1 RETURNING *';
    try {
        const result = await connection.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Pedido con ID ${id} no existe` });
        }
        res.status(200).json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API CREATE tabla: detalle_pedido PUBLICAR [POST]
app.post('/api/detalles', async (req, res) => {
    const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'INSERT INTO detalle_pedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    try {
        const result = await connection.query(query, [id_detalle, id_pedido, id_prod, cantidad, subtotal]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el detalle', error: err.message });
    }
});
// API READ tabla: detalle_pedido OBTENER [GET]
app.get('/api/detalles', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM detalle_pedido');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// API UPDATE tabla: detalle_pedido ACTUALIZAR [PUT]
app.put('/api/detalles/:id', async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'UPDATE detalle_pedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *';
    try {
        const result = await connection.query(query, [id_pedido, id_prod, cantidad, subtotal, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Detalle con ID ${id} no encontrado` });
        }
        res.status(200).json({ success: true, updated: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// API DELETE tabla: detalle_pedido ELIMINAR [DELETE]
app.delete('/api/detalles/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM detalle_pedido WHERE id_detalle = $1 RETURNING *';
    try {
        const result = await connection.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: `No existe detalle con ID ${id}` });
        }
        res.status(200).json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONSULTA NATIVA: Obtener todos los productos de un pedido específico [GET]
app.get('/api/consultaN1/:id_pedido_especifico/resultado', async (req, res) => {
    const { id_pedido_especifico } = req.params;
    const query = 'SELECT p.id_prod, p.nombre, p.precio, dp.cantidad, dp.subtotal FROM detalle_pedido dp JOIN producto p ON dp.id_prod = p.id_prod WHERE dp.id_pedido = $1';
    try {
        const result = await connection.query(query, [id_pedido_especifico]);
        res.status(200).json({ success: true, resultado: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONSULTA NATIVA: Obtener los productos más vendidos (más de X unidades) [GET]
app.get('/api/ranking/:neto', async (req, res) => {
    const { neto } = req.params;
    const query = 'SELECT p.id_prod, p.nombre, SUM(dp.cantidad) AS total_vendido FROM detalle_pedido dp JOIN producto p ON dp.id_prod = p.id_prod GROUP BY p.id_prod, p.nombre HAVING SUM(dp.cantidad) > $1 ORDER BY total_vendido DESC';
    try {
        const result = await connection.query(query, [neto]);
        res.status(200).json({ success: true, productos: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONSULTA NATIVA: Obtener el total de ventas por restaurante [GET]
app.get('/api/Recaudo_Restaurantes', async (req, res) => {
    try {
        const result = await connection.query('SELECT r.id_rest, r.nombre, SUM(p.total) AS total_ventas FROM restaurante r JOIN pedido p ON r.id_rest = p.id_rest GROUP BY r.id_rest, r.nombre ORDER BY total_ventas DESC');
        res.status(200).json({ success: true, ventas: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONSULTA NATIVA: Obtener los pedidos realizados en una fecha específica [GET]
app.get('/api/peticion/:fecha', async (req, res) => {
    const { fecha } = req.params;
    const query = 'SELECT * FROM pedido WHERE fecha = $1 ORDER BY id_pedido';
    try {
        const result = await connection.query(query, [fecha]);
        res.status(200).json({ success: true, pedidos: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONSULTA NATIVA: Obtener los empleados por rol en un restaurante [GET]
app.get('/api/cargo/:id_rest/:rol', async (req, res) => {
    const { id_rest, rol } = req.params;
    const query = 'SELECT * FROM empleado WHERE id_rest = $1 AND rol = $2';
    try {
        const result = await connection.query(query, [id_rest, rol]);
        res.status(200).json({ success: true, empleados: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////