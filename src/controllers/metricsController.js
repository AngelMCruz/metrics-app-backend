const supabase = require('../config/supabase');

// GET: Obtener todas las métricas o filtrar por departamento
const getMetrics = async (req, res) => {
    try {
        const { departmento } = req.query;
        let query = supabase.from('metricas').select('*');

        // Si se proporciona un departamento, filtrar por ese departamento
        if (departmento) {
            query = query.eq('departmento', departmento);
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

module.exports = { getMetrics };