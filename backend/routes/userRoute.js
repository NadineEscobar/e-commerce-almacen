import { Router } from 'express';
import { registerUser, authUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';  // Importar funciones desde el controlador
import { protect } from '../middleware/authMiddleware.js'; // Middleware de autenticación

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser); // Crear un nuevo usuario

// Ruta para autenticar al usuario (login)
router.post('/login', authUser); // Autenticación y generación de JWT

// Ruta para obtener el perfil de un usuario (requiere estar autenticado)
router.get('/profile', protect, getUserProfile);

// Ruta para actualizar el perfil de un usuario (requiere estar autenticado)
router.put('/profile', protect, updateUserProfile);

// Exportar el router
export default router;
