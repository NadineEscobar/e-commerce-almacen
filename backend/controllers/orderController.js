import Order from '../models/orderModel.js'; // Asegúrate de tener el modelo de orden

// Crear una orden
export const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;
        const order = new Order({ userId, items, totalPrice, status: 'Pendiente' });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};