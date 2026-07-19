const supabase = require('../config/supabase');

const getDepartamentos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('departamentos')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getDepartamentos };