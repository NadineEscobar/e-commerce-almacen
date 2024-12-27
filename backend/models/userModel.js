import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'; // Usar la importación por defecto

const { compare, genSalt, hash } = bcrypt;

const userSchema = Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Usar bcrypt.compare
};

// Middleware para encriptar contraseñas antes de guardarlas
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10); // Usar bcrypt.genSalt
    this.password = await bcrypt.hash(this.password, salt); // Usar bcrypt.hash y esperar su resolución
    next();
});

export default model('User', userSchema);