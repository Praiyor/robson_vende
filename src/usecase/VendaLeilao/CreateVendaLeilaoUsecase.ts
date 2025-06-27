import { vendaLeilao } from "../../main/generated/prisma";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { itemRepositoryInterface } from "../../repository/interface/itemRepositoryInterface";
import { deckRepositoryInterface } from "../../repository/interface/deckRepositoryInterface";
import { cardRepositoryInterface } from "../../repository/interface/cardRepositoryInterface";
import { CreateDeckUsecase } from "../Deck/CreateDeckUsecase";
import { ItemRelationTypeEnum } from "../../utils/enum/enums";
import { CreateCardUsecase } from "../Card/CreateCardUsecase";
import { CreateItemUsecase } from "../Item/CreateItemUsecase";
import { vendaLeilaoRepositoryInterface } from "../../repository/interface/vendaLeilaoRepositoryInterface";
import { vendaLeilaoDTO } from "../../utils/dto/vendaLeilaoDTO";
import { prisma } from "../../main/config/prisma";
import { Prisma } from "@prisma/client";

export class CreateVendaLeilaoUsecase implements BaseUsecaseInterface<[vendaLeilaoDTO], vendaLeilao>{

    constructor(private vendaLeilaoRepository: vendaLeilaoRepositoryInterface,
                private itemRepository: itemRepositoryInterface,
                private deckRepository: deckRepositoryInterface,
                private cardRepository: cardRepositoryInterface
    ) {}

    async execute(vendaLeilaoData: vendaLeilaoDTO): Promise<vendaLeilao> {
        await this.validate(vendaLeilaoData);

        const result = await prisma.$transaction(async (tx) => {
            const vendaLeilaoCreated = await this.vendaLeilaoRepository.create(tx, { inicio: vendaLeilaoData.inicio,
                                                                             fim: vendaLeilaoData.fim, 
                                                                             preco: vendaLeilaoData.preco,
                                                                             status: "A venda" });

            const createItemUsecase = new CreateItemUsecase(this.itemRepository);
            const item = await createItemUsecase.execute(tx, {relationId: vendaLeilaoCreated.id , relationType: ItemRelationTypeEnum.VENDA_LEILAO});

            await this.createRelatedEntity(vendaLeilaoData, item.id, tx);

            return vendaLeilaoCreated;
        })
        
        return result;
    }

    async validate(data: vendaLeilaoDTO){
        if (!data || !data.preco) {
            throw new Error("Invalid data provided for Venda Simples creation");
        }

        if (!!data.deckId === !!data.cardId) {
        throw new Error("Must pass only a Deck or a Card, not both or neither");
        }

        if (new Date(data.inicio) >= new Date(data.fim)) {
          throw new Error("The begining date must be before the ending date");
        }

        if (data.preco < 0) {
          throw new Error("The price must be positive");
        }
    }

    private async createRelatedEntity(data: vendaLeilaoDTO, itemId: number, tx: Prisma.TransactionClient): Promise<void> {
        if(data.cardId){
            const createCardUsecase = new CreateCardUsecase(this.cardRepository);
            await createCardUsecase.execute(tx, data.cardId, itemId);
        }else if (data.deckId) {
            const createDeckUsecase = new CreateDeckUsecase(this.deckRepository);
            await createDeckUsecase.execute(tx, data.deckId, itemId);
        }
    }
}