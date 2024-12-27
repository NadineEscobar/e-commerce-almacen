import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { join, resolve } from 'path';
import { static as serveStatic } from 'express';
import userRoutes from './routes/userRoutes.js'; // Cambiado de require a import
import productRoutes from './routes/productRoutes.js'; // Cambiado de require a import

// Cargar variables de entorno
config();

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middleware
app.use(cors());
app.use(json());

// Rutas principales
app.use('/api/users', userRoutes); // Cambiado de require a import
app.use('/api/products', productRoutes); // Cambiado de require a import

// Servir el frontend
app.use(serveStatic(join(process.cwd(), 'frontend'))); // Cambiado __dirname a process.cwd()

app.get('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'frontend', 'index.html')); // Cambiado __dirname a process.cwd()
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});