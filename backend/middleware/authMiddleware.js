import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No hay token, acceso denegado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

// Middleware para verificar si el usuario es administrador
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Si es admin, continuar
    } else {
        res.status(401).json({ message: 'No autorizado, se requiere ser administrador' });
    }
};
