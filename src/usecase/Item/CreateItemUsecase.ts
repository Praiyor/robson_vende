import axios from "axios";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { item } from "../../main/generated/prisma";
import { itemRepositoryInterface } from "../../repository/interface/itemRepositoryInterface";
import { itemDTO } from "../../utils/dto/itemDTO";

export class CreateItemUsecase implements BaseUsecaseInterface<[itemDTO], item>{
    constructor( private itemRepository: itemRepositoryInterface ) {}

    async execute(itemData: itemDTO): Promise<item>{
        await this.validate(itemData);
        const itemCreated = await this.itemRepository.create(itemData)
        return itemCreated;
    }

    async validate(itemData: itemDTO){
        const { relationId, relationType } = itemData;

        if (!relationType) {
        throw new Error("Relation type must be provided (DECK or CARD).");
        }

        if (!relationId || typeof relationId !== 'number' || relationId <= 0) {
        throw new Error("A valid relation ID must be provided.");
        }
        
        const validTypes = ["DECK", "CARD"];
        if (!validTypes.includes(relationType.toUpperCase())) {
            throw new Error("Invalid relation type. Must be either 'DECK' or 'CARD'.");
        }
    }
}