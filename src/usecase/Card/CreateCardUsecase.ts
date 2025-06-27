import axios from "axios";
import { card } from "../../main/generated/prisma";
import { cardRepositoryInterface } from "../../repository/interface/cardRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { cardMicroservice, CardMicroserviceDTO } from "../../controller/schema/cardSchema";
import { Prisma } from "@prisma/client";

export class CreateCardUsecase implements BaseUsecaseInterface<[Prisma.TransactionClient, number, number], card, [CardMicroserviceDTO]>{
    constructor( private cardRepository: cardRepositoryInterface ) {}

    async execute(tx: Prisma.TransactionClient, cardId: number, itemId: number): Promise<card>{
        const response = await axios.get(`http://api-gateway:8080/card/${cardId}`);
        const parseResult = cardMicroservice.safeParse(response.data);
        
        if(!parseResult.success){
            throw new Error("Invalid card data from microservice: " + parseResult.error.errors[0].message);
        }

        const cardData = parseResult.data
        await this.validate(cardData);
        
        const cardToCreate = {
            id: cardData.id,
            name: cardData.name,
            description: cardData.description,
            itemId: itemId
        };

        const createdCard = await this.cardRepository.create(tx, cardToCreate);
        return createdCard;
    }

    async validate(cardData: CardMicroserviceDTO){
        if (cardData.price < 0) {
          throw new Error("Card price must be non-negative.");
        }

        const allowedTypes = ["criatura", "feitiço", "terreno", "artefato", "encantamento", "magia instantânea"];
        if (!allowedTypes.includes(cardData.type.toLowerCase())) {
          throw new Error("Invalid card type: " + cardData.type);
        }
    
        const allowedColors = ["branco", "azul", "preto", "verde", "vermelho", "incolor"];
        if (!allowedColors.includes(cardData.color.toLowerCase())) {
          throw new Error("Invalid card color: " + cardData.color);
        }
    }
}