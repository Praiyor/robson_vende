import { vendaSimples } from "../../main/generated/prisma";
import { vendaSimplesDTO } from "../../utils/dto/vendaSimplesDTO";
import { vendaSimplesRepositoryInterface } from '../../repository/interface/vendaSimplesRepositoryInterface';
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { itemRepositoryInterface } from "../../repository/interface/itemRepositoryInterface";
import { deckRepositoryInterface } from "../../repository/interface/deckRepositoryInterface";
import { cardRepositoryInterface } from "../../repository/interface/cardRepositoryInterface";
import { CreateDeckUsecase } from "../Deck/CreateDeckUsecase";
import { ItemRelationTypeEnum } from "../../utils/enum/enums";
import { CreateCardUsecase } from "../Card/CreateCardUsecase";
import { CreateItemUsecase } from "../Item/CreateItemUsecase";

export class UpdateVendaSimplesByIdUsecase implements BaseUsecaseInterface<[number,vendaSimplesDTO], vendaSimples>{

    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface,
                private itemRepository: itemRepositoryInterface,
                private deckRepository: deckRepositoryInterface,
                private cardRepository: cardRepositoryInterface
    ) {}

    async execute(vendaSimplesId: number, vendaSimplesData: vendaSimplesDTO): Promise<vendaSimples> {
        await this.validate(vendaSimplesId, vendaSimplesData);

        const { relationId, relationType } = await this.createRelatedEntity(vendaSimplesData);

        const createItemUsecase = new CreateItemUsecase(this.itemRepository);
        const item = await createItemUsecase.execute({relationId, relationType});

        const vendaSimplesCreated = await this.vendaSimplesRepository.create({ preco: vendaSimplesData.preco });
        return vendaSimplesCreated;
    }

    async validate(vendaSimplesId: number, data: vendaSimplesDTO){
        if (!data || !data.preco) {
            throw new Error("Invalid data provided for Venda Simples creation");
        }

        if (!!data.deckId === !!data.cardId) {
        throw new Error("Must pass only a Deck or a Card, not both or neither");
        }
        
        if (data.preco < 0) {
          throw new Error("The price must be positive");
        }
    }

    private async createRelatedEntity(data: vendaSimplesDTO): Promise<{ relationId: number; relationType: ItemRelationTypeEnum }> {
        if (data.deckId) {
            const deckCreated = await new CreateDeckUsecase(this.deckRepository).execute(data.deckId);
            return { relationId: deckCreated.id, relationType: ItemRelationTypeEnum.DECK };
        } else {
            const cardCreated = await new CreateCardUsecase(this.cardRepository).execute(data.cardId!);
            return { relationId: cardCreated.id, relationType: ItemRelationTypeEnum.CARD };
        }
    }
    
}