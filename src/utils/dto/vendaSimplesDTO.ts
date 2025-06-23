import { z } from "zod";
import { vendaSimplesSchema } from "../../controller/schema/vendaSimplesSchema";

export type vendaSimplesDTO = z.infer<typeof vendaSimplesSchema>;