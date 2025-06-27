import { PrismaClient } from "@prisma/client";
import { prisma } from "../main/config/prisma";
import { vendaLeilao } from "../main/generated/prisma";
import { vendaLeilaoRepositoryInterface } from "./interface/vendaLeilaoRepositoryInterface";

export class vendaLeilaoRepository implements vendaLeilaoRepositoryInterface {
    private static instance: vendaLeilaoRepository;

    private constructor(){}

    static getInstance(): vendaLeilaoRepository {
        if(!vendaLeilaoRepository.instance){
            vendaLeilaoRepository.instance = new vendaLeilaoRepository();
        }
        return vendaLeilaoRepository.instance;
    }

    async create(tx: PrismaClient, vendaLeilaoData: Omit<vendaLeilao, 'id' | 'item' | 'itemId'>): Promise<vendaLeilao> 
    {
        const vendaCreated = await tx.vendaLeilao.create({
            data: {
                preco: vendaLeilaoData.preco,
                inicio: vendaLeilaoData.inicio,
                fim: vendaLeilaoData.fim,
                status: vendaLeilaoData.status,
                lances: 0, 
            },
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