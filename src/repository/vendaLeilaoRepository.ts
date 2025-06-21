import { prisma } from "../main/config/prisma";
import { vendaLeilao } from "../main/generated/prisma";
import { vendaLeilaoRepositoryInterface } from "./interface/vendaLeilaoRepositoryInterface";

export class vendaLeilaoRepository implements vendaLeilaoRepositoryInterface {
    async create(vendaLeilao: Omit<vendaLeilao, 'id' | 'item' | 'itemId'>, iItemId: number): Promise<vendaLeilao> 
    {
        const vendaCreated = await prisma.vendaLeilao.create({
            data: {
                ...vendaLeilao,
                item: {
                    connect: { id: iItemId}
                }
            }
        });

        return vendaCreated;
    }

    async findAll(): Promise<vendaLeilao[]> 
    {
        return await prisma.vendaLeilao.findMany();
    }

    async findById(vendaLeilaoId: number): Promise<vendaLeilao | null> 
    {
        return await prisma.vendaLeilao.findUnique({
            where: {
                id: vendaLeilaoId
            }, include: {
                item: true
            }
        });
    }

    async deleteById(vendaLeilaoId: number): Promise<void> 
    {
        await prisma.vendaLeilao.delete({
            where: {
                id: vendaLeilaoId
            }
        })
    }

    async updateById(vendaLeilaoId: number, vendaLeilaoData: any): Promise<vendaLeilao | null> 
    {
        return await prisma.vendaLeilao.update({
            where: {
                id: vendaLeilaoId
            },
            data: vendaLeilaoData,
        })
    }
    
}