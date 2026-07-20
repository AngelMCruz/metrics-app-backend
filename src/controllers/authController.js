const supabase = require('../config/supabase');

/**
 * Registra un nuevo usuario en Supabase Auth adjuntando metadatos como el rol y nombre.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const registerUser = async (req, res, next) => {
  try {
    const { email, password, nombre, role } = req.body;

    if (!email || !password) {
      const err = new Error('Email y contraseña son requeridos.');
      err.statusCode = 400;
      return next(err);
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nombre || '',
          role: role || 'user'
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
    next(error);
  }
};

/**
 * Autentica un usuario existente mediante correo electrónico y contraseña.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      const err = new Error(error.message);
      err.statusCode = 400;
      return next(err);
    }

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
    next(error);
  }
};

module.exports = { registerUser, loginUser };