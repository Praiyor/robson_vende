import { z } from "zod";

// base
const baseVendaLeilaoSchema = z.object({
  preco: z.number().min(0, "The minimum price must be 0"),
  inicio: z.preprocess((val) => new Date(val as string), z.date()),
  fim: z.preprocess((val) => new Date(val as string), z.date()),
  deckId: z.number().int().positive().optional(),
  cardId: z.number().int().positive().optional(),
});

// Utilizado na criação de vendaLeilao
export const vendaLeilaoSchema = baseVendaLeilaoSchema.superRefine((data, ctx) => {
  if (data.fim <= new Date()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['fim'],
      message: "End date must be in the future",
    });
  }

  if (data.inicio >= data.fim) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['inicio'],
      message: "Start date must be before end date",
    });
  }
});

// Utilizado no update de vendaLeilao
export const vendaLeilaoPartialSchema = baseVendaLeilaoSchema.partial();

export const vendaLeilaoIdParamSchema = z.object({
    vendaLeilaoId: z.string()
        .transform(Number)
        .refine(val => Number.isInteger(val) && val > 0, {
            message: "Venda Leilao ID must be a positive integer",
        }),
});