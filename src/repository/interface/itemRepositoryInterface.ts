import { item } from "../../main/generated/prisma";
import { ItemRelationType } from "../../utils/types/types";

export interface itemRepositoryInterface {
    create(itemData: any, iRelationId: number, relationType: ItemRelationType): Promise<item>;
    findAll(): Promise<item[]>;
    findById(itemId: number): Promise<item | null>;
    deleteById(itemId: number): Promise<void>;
    updateById(itemId: number, itemData: any): Promise<item | null>;
}