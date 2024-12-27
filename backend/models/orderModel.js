import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, default: 'Pendiente' },
    },
    { timestamps: true }
);

export default model('Order', orderSchema);