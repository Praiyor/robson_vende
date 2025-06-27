import { PrismaClient } from "@prisma/client";
import { vendaLeilao } from "../../main/generated/prisma";

export interface vendaLeilaoRepositoryInterface {
    create(tx: PrismaClient, vendaLeilao: any): Promise<vendaLeilao>;
    findAll(): Promise<vendaLeilao[]>;
    findById(vendaLeilaoId: number): Promise<vendaLeilao | null>;
    deleteById(vendaLeilaoId: number): Promise<void>;
    updateById(vendaLeilaoId: number, vendaLeilaoData: any): Promise<vendaLeilao | null>;
}