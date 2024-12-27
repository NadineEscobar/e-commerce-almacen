import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';  // Middleware para autenticación y roles de administrador

const router = Router();

// Obtener todos los productos
router.get('/', getProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Ruta para crear un producto (solo admins)
router.post('/', protect, admin, createProduct);

// Ruta para actualizar un producto (solo admins)
router.put('/:id', protect, admin, updateProduct);

// Ruta para eliminar un producto (solo admins)
router.delete('/:id', protect, admin, deleteProduct);

export default router;