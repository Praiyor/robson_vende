import { prisma } from "../main/config/prisma";
import { deck } from "../main/generated/prisma";
import { deckDTO } from "../utils/dto/deckDTO";
import { deckRepositoryInterface } from "./interface/deckRepositoryInterface";

export class deckRepository implements deckRepositoryInterface 
{
    constructor(){}
    async create(deck: deckDTO): Promise<deck> {
        const deckCreated = await prisma.deck.create({
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