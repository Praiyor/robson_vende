import { vendaSimples } from "../main/generated/prisma";
import { vendaSimplesRepositoryInterface } from "./interface/vendaSimplesRepositoryInterface";
import { prisma } from "../main/config/prisma";
import { PrismaClient } from "@prisma/client";

export class vendaSimplesRepository implements vendaSimplesRepositoryInterface {
    private static instance: vendaSimplesRepository;

    private constructor(){}

    static getInstance(): vendaSimplesRepository {
        if(!vendaSimplesRepository.instance){
            vendaSimplesRepository.instance = new vendaSimplesRepository();
        }
        return vendaSimplesRepository.instance;
    }

    async create(tx: PrismaClient, vendaSimplesData: Omit<vendaSimples, 'id' | 'item' | 'itemId'>): Promise<vendaSimples> 
    {
        const vendaCreated = await tx.vendaSimples.create({
            data: {
                preco: vendaSimplesData.preco,
                status: vendaSimplesData.status
            }
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