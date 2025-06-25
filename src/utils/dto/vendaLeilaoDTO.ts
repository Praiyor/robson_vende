import { z } from "zod";
import { vendaLeilaoSchema } from "../../controller/schema/vendaLeilaoSchema";

export type vendaLeilaoDTO = z.infer<typeof vendaLeilaoSchema>