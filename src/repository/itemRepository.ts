import { item } from "../main/generated/prisma";
import { itemRepositoryInterface } from "./interface/itemRepositoryInterface";

export class itemRepository implements itemRepositoryInterface {
    async create(item: any): Promise<item> 
    {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<item[]> 
    {
        throw new Error("Method not implemented.");
    }

    async findById(itemId: number): Promise<item | null> 
    {
        throw new Error("Method not implemented.");
    }

    async deleteById(itemId: number): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

    async updateById(itemId: number, itemData: any): Promise<item | null> 
    {
        throw new Error("Method not implemented.");
    }
    
}