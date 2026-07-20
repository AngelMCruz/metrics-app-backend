const supabase = require('../config/supabase');

// 1. REGISTRO DE USUARIOS
const registerUser = async (req, res) => {
  try {
    const { email, password, nombre, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    // Le enviamos el rol ('admin' o 'user') en user_metadata a Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nombre || '',
          role: role || 'user' // Por defecto será 'user' si no se especifica
        }
      }
    });

    if (error) throw new Error(error.message);

    return res.status(201).json({
      message: 'Usuario guardado correctamente en Supabase',
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role,
        nombre: data.user.user_metadata?.full_name
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 2. INICIO DE SESIÓN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw new Error(error.message);

    return res.json({
      message: 'Autenticación exitosa',
      session: {
        access_token: data.session.access_token,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.user_metadata?.role || 'user',
          nombre: data.user.user_metadata?.full_name || ''
        }
      }
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };