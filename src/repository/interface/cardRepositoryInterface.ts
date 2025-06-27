import { Prisma } from "@prisma/client";
import { card } from "../../main/generated/prisma";

export interface cardRepositoryInterface {
    create(tx: Prisma.TransactionClient, card: any): Promise<card>;
    findAll(): Promise<card[]>;
    findById(cardId: number): Promise<card | null>;
    deleteById(cardId: number): Promise<void>;
}