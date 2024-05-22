import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
  },
});

productSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  tags: 'text',
});

export const ProductModel = model<TProduct>('Product', productSchema);
