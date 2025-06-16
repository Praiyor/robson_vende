import { vendaSimples } from "../../main/generated/prisma";

export interface vendaSimplesRepositoryInterface {
    create(vendaSimples: any): Promise<vendaSimples>;
    findAll(): Promise<vendaSimples[]>;
    findById(vendaSimplesId: number): Promise<vendaSimples | null>;
    deleteById(vendaSimplesId: number): Promise<void>;
    updateById(vendaSimplesId: number, vendaSimplesData: any): Promise<vendaSimples | null>;
}