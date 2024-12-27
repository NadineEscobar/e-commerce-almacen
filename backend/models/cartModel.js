import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);

export default model('Cart', cartSchema);