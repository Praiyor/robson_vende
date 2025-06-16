import { prisma } from "../main/config/prisma";
import { deck } from "../main/generated/prisma";
import { deckRepositoryInterface } from "./interface/deckRepositoryInterface";

export class deckRepository implements deckRepositoryInterface 
{
    async create(deck: any): Promise<deck> {
        const deckCreated = await prisma.deck.create({
            data: deck
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