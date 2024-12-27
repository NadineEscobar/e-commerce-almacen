import { Schema, model } from 'mongoose';

// Definimos el esquema del producto
const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

// Creamos el modelo del producto
const Product = model('Product', productSchema);

// Exportamos el modelo como valor por defecto
export default Product;