import { deck } from "../../main/generated/prisma";

export interface deckRepositoryInterface {
    create(deck: any): Promise<deck>;
    findAll(): Promise<deck[]>;
    findById(deckId: number): Promise<deck | null>;
    deleteById(deckId: number): Promise<void>;
}