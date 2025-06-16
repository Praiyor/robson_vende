import { item } from "../../main/generated/prisma";

export interface itemRepositoryInterface {
    create(item: any): Promise<item>;
    findAll(): Promise<item[]>;
    findById(itemId: number): Promise<item | null>;
    deleteById(itemId: number): Promise<void>;
    updateById(itemId: number, itemData: any): Promise<item | null>;
}