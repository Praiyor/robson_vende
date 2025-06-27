import { z } from "zod";

export const deckMicroservice = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    format: z.string(),
    minCards: z.number().optional().nullable(),
    exactCards: z.number().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    cards: z.array(z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
    })),
});

export type DeckMicroserviceDTO = z.infer<typeof deckMicroservice>;