import {z} from "zod";

const productSchema=z.object({
    name:z.string().min(6),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price: z.number(),
    image: z.string(),
})

export default productSchema;