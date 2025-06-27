import axios from "axios";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { item } from "../../main/generated/prisma";
import { itemRepositoryInterface } from "../../repository/interface/itemRepositoryInterface";
import { itemDTO } from "../../utils/dto/itemDTO";
import { ItemRelationTypeEnum } from "../../utils/enum/enums";
import { Prisma } from "@prisma/client";

export class CreateItemUsecase implements BaseUsecaseInterface<[Prisma.TransactionClient, itemDTO], item>{
    constructor( private itemRepository: itemRepositoryInterface ) {}

    async execute(tx: Prisma.TransactionClient,  dto: itemDTO): Promise<item>{
        await this.validate(dto);
        const itemCreated = await this.itemRepository.create(tx, dto);
        return itemCreated;
    }

    async validate(dto: itemDTO){
        if (!dto || !dto.relationId || !dto.relationType) {
          throw new Error("Invalid params to create the item");
        }
    
        const validTypes = [
          ItemRelationTypeEnum.VENDA_SIMPLES,
          ItemRelationTypeEnum.VENDA_LEILAO,
        ];
    
        if (!validTypes.includes(dto.relationType)) {
          throw new Error("relationType must be VENDA_SIMPLES or VENDA_LEILAO");
        }
    }
}