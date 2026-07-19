const supabase = require('../config/supabase');

// GET: Obtener todas las métricas o filtrar por departamento
const getMetrics = async (req, res) => {
    try {
        // 1. Corregido el typo a 'departamento' (o como decidas mandarlo en la URL)
        const { departamento } = req.query; 
        let query = supabase.from('metricas_homogeneas').select('*');

        // 2. Corregido para usar la columna real de tu tabla: 'departamento_id'
        if (departamento) {
            query = query.eq('departamento_id', departamento);
        }

        const { data, error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST: Crear una nueva métrica
const createMetric = async (req, res) => {
    try {
        const { titulo_reporte, valor_metrica, descripcion, departamento_id } = req.body;
        const { data, error } = await supabase
            .from('metricas')
            .insert([{ titulo_reporte, valor_metrica, descripcion, departamento_id }])
            .select(); 

        if (error) throw new Error(error.message);

        // Retorno del objeto insertado
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// PUT: Actualizar una métrica existente
const updateMetric = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo_reporte, valor_metrica, descripcion, departamento_id } = req.body;

        const { data, error } = await supabase
            .from('metricas')
            .update({ titulo_reporte, valor_metrica, descripcion, departamento_id })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Métrica no encontrada' });
        }

        return res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Eliminar una métrica existente
const deleteMetric = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('metricas')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Métrica no encontrada' });
        }

        return res.json({ message: 'Métrica eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportación de funciones para ser usadas en las rutas
module.exports = { getMetrics, createMetric, updateMetric, deleteMetric };