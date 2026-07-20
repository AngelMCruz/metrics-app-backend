const supabase = require('../config/supabase');

/**
 * Obtiene la lista de métricas, permitiendo filtrar por departamento mediante query params.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getMetrics = async (req, res, next) => {
    try {
        const { departamento } = req.query; 
        let query = supabase.from('metricas_homogeneas').select('*');

        if (departamento) {
            query = query.eq('departamento_id', departamento);
        }

        const { data, error } = await query;
        if (error) throw new Error(error.message);

        res.json(data);
    } catch (error) {
        next(error);
    }
};

/**
 * Crea un nuevo registro de métrica homogénea en la base de datos.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const createMetric = async (req, res, next) => {
    try {
        const { departamento_id, concepto, nombre_visual, valor_numerico, unidad, mes } = req.body;
        
        const { data, error } = await supabase
            .from('metricas_homogeneas')
            .insert([{ departamento_id, concepto, nombre_visual, valor_numerico, unidad, mes }])
            .select(); 

        if (error) throw new Error(error.message);

        res.status(201).json(data[0]);
    } catch (error) {
        next(error);
    }
};

/**
 * Actualiza los datos de una métrica existente según su identificador único.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const updateMetric = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { departamento_id, concepto, nombre_visual, valor_numerico, unidad, mes } = req.body;

        const { data, error } = await supabase
            .from('metricas_homogeneas')
            .update({ departamento_id, concepto, nombre_visual, valor_numerico, unidad, mes })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        
        if (!data || data.length === 0) {
            const err = new Error('Métrica no encontrada');
            err.statusCode = 404;
            return next(err);
        }

        return res.json(data[0]);
    } catch (error) {
        next(error);
    }
};

/**
 * Elimina una métrica de la base de datos mediante su ID.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const deleteMetric = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const { data, error } = await supabase
            .from('metricas_homogeneas')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        
        if (!data || data.length === 0) {
            const err = new Error('Métrica no encontrada');
            err.statusCode = 404;
            return next(err);
        }

        return res.json({ message: 'Métrica eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getMetrics, createMetric, updateMetric, deleteMetric };