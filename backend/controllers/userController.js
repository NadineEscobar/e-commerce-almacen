import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { compare, genSalt, hash } = bcrypt;

// Registrar usuario
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const user = new User({ name, email, password });

        // Guardar el usuario (el middleware en 'userModel.js' encriptará la contraseña)
        await user.save();

        // Responder con los datos del usuario y el token
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

// Autenticación de usuario (Login)
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Responder con los datos del usuario y el token
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticar', error: error.message });
    }
};

// Función para generar el token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Obtener el perfil del usuario
export const getUserProfile = async (req, res) => {
    try {
        // Buscar al usuario utilizando la información del JWT
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: error.message });
    }
};

// Actualizar el perfil del usuario
export const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Buscar al usuario por ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar el correo electrónico si es diferente
        if (email && email !== user.email) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            user.email = email;
        }

        // Actualizar la contraseña si es proporcionada
        if (password) {
            user.password = password;  // Se encriptará automáticamente en el middleware de 'userModel.js'
        }

        // Actualizar el nombre si se proporciona
        if (name) {
            user.name = name;
        }

        // Guardar los cambios
        await user.save();

        // Responder con los datos actualizados y el token
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
    }
};