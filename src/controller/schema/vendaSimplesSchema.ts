import { z } from "zod";

export const vendaSimplesSchema = z.object({
    preco: z.number().min(0, "The minimun price must be 0"),
    deckId: z.number().int().positive("Deck ID must be a positive integer").optional(),
    cardId: z.number().int().positive("Card ID must be a positive integer").optional(),
})

export const vendaSimplesIdParamSchema = z.object({
    vendaSimplesId: z.string()
        .transform(Number)
        .refine(val => Number.isInteger(val) && val > 0, {
            message: "Venda Simples ID must be a positive integer",
        }),
});