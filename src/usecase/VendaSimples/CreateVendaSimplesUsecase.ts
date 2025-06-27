import { vendaSimples } from "../../main/generated/prisma";
import { vendaSimplesDTO } from "../../utils/dto/vendaSimplesDTO";
import { vendaSimplesRepositoryInterface } from '../../repository/interface/vendaSimplesRepositoryInterface';
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { itemRepositoryInterface } from "../../repository/interface/itemRepositoryInterface";
import { deckRepositoryInterface } from "../../repository/interface/deckRepositoryInterface";
import { cardRepositoryInterface } from "../../repository/interface/cardRepositoryInterface";
import { CreateDeckUsecase } from "../Deck/CreateDeckUsecase";
import { ItemRelationTypeEnum } from "../../utils/enum/enums";
import { CreateCardUsecase } from '../Card/CreateCardUsecase';
import { CreateItemUsecase } from "../Item/CreateItemUsecase";
import { prisma } from "../../main/config/prisma";
import { Prisma } from "@prisma/client";

export class CreateVendaSimplesUsecase implements BaseUsecaseInterface<[vendaSimplesDTO], vendaSimples>{

    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface,
                private itemRepository: itemRepositoryInterface,
                private deckRepository: deckRepositoryInterface,
                private cardRepository: cardRepositoryInterface
    ) {}

    async execute(vendaSimplesData: vendaSimplesDTO): Promise<vendaSimples> {
        await this.validate(vendaSimplesData);

        const result = await prisma.$transaction(async (tx) => {
            const vendaSimplesCreated = await this.vendaSimplesRepository.create(tx, { preco: vendaSimplesData.preco, status: "A venda" });

            const createItemUsecase = new CreateItemUsecase(this.itemRepository);
            const item = await createItemUsecase.execute(tx, {
                                          relationId: vendaSimplesCreated.id,
                                          relationType: ItemRelationTypeEnum.VENDA_SIMPLES
                                        });

            await this.createRelatedEntity(vendaSimplesData, item.id, tx);
                                    
            return vendaSimplesCreated;
        })

        return result;
    }

    async validate(data: vendaSimplesDTO){
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

    private async createRelatedEntity(data: vendaSimplesDTO, itemId: number, tx: Prisma.TransactionClient): Promise<void> {
        if(data.cardId){
            const createCardUsecase = new CreateCardUsecase(this.cardRepository);
            await createCardUsecase.execute(tx, data.cardId, itemId);
        }else if (data.deckId) {
            const createDeckUsecase = new CreateDeckUsecase(this.deckRepository);
            await createDeckUsecase.execute(tx, data.deckId, itemId);
        }
    }
}