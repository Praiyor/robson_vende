import { z } from "zod";

export const cardMicroservice = z.object({
    id: z.number(),
    name: z.string().min(1),
    description: z.string(),
    color: z.string(),
    type: z.string(),
    category: z.string().optional(),
    price: z.number().nonnegative(),
    createdAt: z.coerce.date(),
    power: z.string().optional(),
    imageUrl: z.string(),
})

export type CardMicroserviceDTO = z.infer<typeof cardMicroservice>;