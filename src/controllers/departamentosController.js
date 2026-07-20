const supabase = require('../config/supabase');

/**
 * Obtiene el catálogo completo de departamentos ordenados por identificador.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getDepartamentos = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('departamentos')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw new Error(error.message);

        res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = { getDepartamentos };