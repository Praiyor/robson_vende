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

export class CreateVendaSimplesUsecase implements BaseUsecaseInterface<[vendaSimplesDTO], vendaSimples>{

    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface,
                private itemRepository: itemRepositoryInterface,
                private deckRepository: deckRepositoryInterface,
                private cardRepository: cardRepositoryInterface
    ) {}

    async execute(vendaSimplesData: vendaSimplesDTO): Promise<vendaSimples> {
        let relationId: number;
        let relationType: ItemRelationTypeEnum;

        this.validate(vendaSimplesData);

        if(vendaSimplesData.deckId){
            const createDeckUsecase = new CreateDeckUsecase(this.deckRepository);
            const deck = await createDeckUsecase.execute(vendaSimplesData.deckId);

            relationId = deck.id;
            relationType = ItemRelationTypeEnum.DECK;
        } else {
            const createCardUsecase = new CreateCardUsecase(this.cardRepository);
            const card = await createCardUsecase.execute(vendaSimplesData.cardId);

            relationId = card.id;
            relationType = ItemRelationTypeEnum.CARD;
        }

        const createItemUsecase = new CreateItemUsecase(this.itemRepository);
        const item = await createItemUsecase.execute({relationId, relationType});

        const vendaSimplesCreated = await this.vendaSimplesRepository.create({ preco: vendaSimplesData.preco }, item.id);
        return vendaSimplesCreated;
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