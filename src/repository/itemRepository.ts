import { prisma } from "../main/config/prisma";
import { item } from "../main/generated/prisma";
import { itemDTO } from "../utils/dto/itemDTO";
import { ItemRelationTypeEnum } from "../utils/enum/enums";
import { itemRepositoryInterface } from "./interface/itemRepositoryInterface";

export class itemRepository implements itemRepositoryInterface {
    constructor(){}
    async create(dto: itemDTO): Promise<item> 
    {
        const { relationId, relationType } = dto;
        let data: any;

          if (relationType === ItemRelationTypeEnum.VENDA_SIMPLES) {
            data = {
              vendaSimples: {
                connect: { id: relationId }
              }
            };
          } else if (relationType === ItemRelationTypeEnum.VENDA_LEILAO) {
            data = {
              vendaLeilao: {
                connect: { id: relationId }
              }
            };
          }

        return prisma.item.create({ data: data })
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