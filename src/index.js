const express = require('express');
const cors = require('cors');
require('dotenv').config();

const metricsRoutes = require('./routes/metricsRoutes');
const departamentosRoutes = require('./routes/departamentosRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/metricas', metricsRoutes);
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor local corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;