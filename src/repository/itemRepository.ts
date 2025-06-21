import { prisma } from "../main/config/prisma";
import { item } from "../main/generated/prisma";
import { ItemRelationTypeEnum } from "../utils/enum/enums";
import { ItemRelationType } from "../utils/types/types";
import { itemRepositoryInterface } from "./interface/itemRepositoryInterface";

export class itemRepository implements itemRepositoryInterface {
    async create(itemData: Partial<item>, iRelationId: number, relationType: ItemRelationType): Promise<item> 
    {
        let data: any = { ...itemData};
        if(relationType === ItemRelationTypeEnum.DECK){
            data.deck = { connect: {id: iRelationId}};
        }
        else if(relationType === ItemRelationTypeEnum.CARD){
            data.card = { connect: {id: iRelationId}};
        } else{ throw new Error("Invalid relation type"); }

        return prisma.item.create({ data: data})
    }

    async findAll(): Promise<item[]> 
    {
        return await prisma.item.findMany()
    }

    async findById(itemId: number): Promise<item | null> 
    {
        return prisma.item.findUnique({
            where: {
                id: itemId
            }, include: {
                card: true,
                deck: true
            }
        })
    }

    async deleteById(itemId: number): Promise<void> 
    {
        await prisma.item.delete({
            where: {
                id: itemId
            }
        })
    }

    async updateById(itemId: number, itemData: any): Promise<item | null> 
    {
        return await prisma.item.update({
            where: {
                id: itemId
            },
            data: itemData,
        });
    }
    
}