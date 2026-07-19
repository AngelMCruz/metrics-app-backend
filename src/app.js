const express = require('express');
const cors = require('cors');
require('dotenv').config();

const metricsRoutes = require('./routes/metricsRoutes');
const departamentosRoutes = require('./routes/departamentosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/metricas', metricsRoutes);
app.use('/api/departamentos', departamentosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});