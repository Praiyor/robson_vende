import { prisma } from "../main/config/prisma";
import { card } from "../main/generated/prisma";
import { cardRepositoryInterface } from "./interface/cardRepositoryInterface";

export class cardRepository implements cardRepositoryInterface 
{
    async create(card: any): Promise<card> {
        const cardCreated = await prisma.card.create({
            data: card
        })

        return cardCreated;
    }

    async findAll(): Promise<card[]> 
    {
        return await prisma.card.findMany();
    }

    async findById(cardId: number): Promise<card | null> 
    {
        return prisma.card.findUnique({
            where: {
                id: cardId
            }
        })
    }

    async deleteById(cardId: number): Promise<void> 
    {
        await prisma.card.delete({
            where: {
                id: cardId
            }
        })
    }
    
}