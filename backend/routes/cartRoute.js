import { Router } from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Obtener el carrito de un usuario
router.get('/', protect, getCart);

// Agregar un producto al carrito
router.post('/', protect, addToCart);

// Eliminar un producto del carrito
router.delete('/:productId', protect, removeFromCart);

export default router;