import { vendaSimples } from "../main/generated/prisma";
import { vendaSimplesRepositoryInterface } from "./interface/vendaSimplesRepositoryInterface";
import { prisma } from "../main/config/prisma";

export class vendaSimplesRepository implements vendaSimplesRepositoryInterface {
    constructor(){}
    async create(vendaSimples: Omit<vendaSimples, 'id' | 'item' | 'itemId'>, iItemId: number): Promise<vendaSimples> 
    {
        const vendaCreated = await prisma.vendaSimples.create({
            data: {
                ...vendaSimples,
                item: {
                    connect: { id: iItemId}
                }}
        });
            
        return vendaCreated;
    }

    async findAll(): Promise<vendaSimples[]> 
    {
        return await prisma.vendaSimples.findMany();
    }

    async findById(vendaSimplesId: number): Promise<vendaSimples | null> 
    {
        return await prisma.vendaSimples.findUnique({
            where: {
                id: vendaSimplesId
            }, include: {
                item: true
            }
        });
    }

    async deleteById(vendaSimplesId: number): Promise<void> 
    {
        await prisma.vendaSimples.delete({
            where: {
                id: vendaSimplesId
            }
        });
    }
    
    async updateById(vendaSimplesId: number, vendaSimplesData: Partial<vendaSimples>): Promise<vendaSimples | null> 
    {
        return await prisma.vendaSimples.update({
            where: {
                id: vendaSimplesId
            },
            data: vendaSimplesData,
        })
    }

}