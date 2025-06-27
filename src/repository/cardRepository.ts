import { Prisma } from "@prisma/client";
import { prisma } from "../main/config/prisma";
import { card } from "../main/generated/prisma";
import { cardDTO } from "../utils/dto/cardDTO";
import { cardRepositoryInterface } from "./interface/cardRepositoryInterface";

export class cardRepository implements cardRepositoryInterface 
{
    private static instance: cardRepository;

    private constructor(){}

    static getInstance(): cardRepository {
        if(!cardRepository.instance){
            cardRepository.instance = new cardRepository();
        }
        return cardRepository.instance;
    }
    
    async create(tx: Prisma.TransactionClient, card: cardDTO): Promise<card> {
        const cardCreated = await tx.card.create({
            data: {
                id: card.id,
                name: card.name,
                description: card.description,
                item: { connect: { id: card.itemId } }
            }
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