import { Prisma } from "@prisma/client";
import { prisma } from "../main/config/prisma";
import { deck } from "../main/generated/prisma";
import { deckDTO } from "../utils/dto/deckDTO";
import { deckRepositoryInterface } from "./interface/deckRepositoryInterface";

export class deckRepository implements deckRepositoryInterface 
{
    private static instance: deckRepository;

    private constructor(){}

    static getInstance(): deckRepository {
        if(!deckRepository.instance){
            deckRepository.instance = new deckRepository();
        }
        return deckRepository.instance;
    }

    async create(tx: Prisma.TransactionClient, deck: deckDTO): Promise<deck> {
        const deckCreated = await tx.deck.create({
            data: {
                id: deck.id,
                name: deck.name,
                description: deck.description,
                deckSize: deck.deckSize,
                item: { connect: { id: deck.itemId } }
            },
        })

        return deckCreated;
    }

    async findAll(): Promise<deck[]> 
    {
        return await prisma.deck.findMany();
    }

    findById(deckId: number): Promise<deck | null> 
    {
        return prisma.deck.findUnique({
            where: {
                id: deckId
            }
        })
    }
    
    async deleteById(deckId: number): Promise<void> 
    {
        await prisma.deck.delete({
            where: {
                id: deckId
            }
        })
    }
    
}