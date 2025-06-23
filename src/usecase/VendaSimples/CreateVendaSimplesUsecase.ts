import { vendaSimples } from "../../main/generated/prisma";
import { vendaSimplesDTO } from "../../utils/dto/vendaSimplesDTO";
import { vendaSimplesRepositoryInterface } from '../../repository/interface/vendaSimplesRepositoryInterface';
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";

export class CreateVendaSimplesUsecase implements BaseUsecaseInterface<[vendaSimplesDTO], vendaSimples>{

    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface) {}

    async execute(vendaSimplesData: vendaSimplesDTO): Promise<vendaSimples> {
        // Validate the input data
        this.validate(vendaSimplesData);

        // Call the repository method to create a new Venda Simples
        const result = await this.vendaSimplesRepository.create(vendaSimplesData, 1);
        return result;
    }

    validate(data: vendaSimplesDTO){
        if (!data || !data.preco) {
            throw new Error("Invalid data provided for Venda Simples creation");
        }
        if (!data.deckId && !data.cardId) {
            throw new Error("Deck ID or Card ID are required for Venda Simples creation");
        }
    }
}