import { item } from "../../main/generated/prisma";
import { itemDTO } from "../../utils/dto/itemDTO";

export interface itemRepositoryInterface {
    create(dto: itemDTO): Promise<item>;
    findAll(): Promise<item[]>;
    findById(itemId: number): Promise<item | null>;
    deleteById(itemId: number): Promise<void>;
    updateById(itemId: number, itemData: any): Promise<item | null>;
}