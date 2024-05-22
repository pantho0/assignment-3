import { z } from 'zod';

// Define the Zod schema for TOrder
const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
});

export default orderValidationSchema;
