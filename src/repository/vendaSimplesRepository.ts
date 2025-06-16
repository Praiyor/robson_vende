import { vendaSimples } from "../main/generated/prisma";
import { vendaSimplesRepositoryInterface } from "./interface/vendaSimplesRepositoryInterface";
import { prisma } from "../main/config/prisma";

export class vendaSimplesRepository implements vendaSimplesRepositoryInterface {
    async create(vendaSimples: any): Promise<vendaSimples> 
    {
        const vendaCreated = await prisma.vendaSimples.create({
            data: vendaSimples
        });
            
        return vendaCreated;
    }

    async findAll(): Promise<vendaSimples[]> 
    {
        return await prisma.vendaSimples.findMany();
    }

    findById(vendaSimplesId: number): Promise<vendaSimples | null> 
    {
        throw new Error("Method not implemented.");
    }

    deleteById(vendaSimplesId: number): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    
    updateById(vendaSimplesId: number, vendaSimplesData: any): Promise<vendaSimples | null> 
    {
        throw new Error("Method not implemented.");
    }

}