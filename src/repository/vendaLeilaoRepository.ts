import { prisma } from "../main/config/prisma";
import { vendaLeilao } from "../main/generated/prisma";
import { vendaLeilaoRepositoryInterface } from "./interface/vendaLeilaoRepositoryInterface";

export class vendaLeilaoRepository implements vendaLeilaoRepositoryInterface {
    create(vendaLeilao: any): Promise<vendaLeilao> 
    {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<vendaLeilao[]> 
    {
        return await prisma.vendaLeilao.findMany();
    }

    findById(vendaLeilaoId: number): Promise<vendaLeilao | null> 
    {
        throw new Error("Method not implemented.");
    }

    deleteById(vendaLeilaoId: number): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

    updateById(vendaLeilaoId: number, vendaLeilaoData: any): Promise<vendaLeilao | null> 
    {
        throw new Error("Method not implemented.");
    }
    
}