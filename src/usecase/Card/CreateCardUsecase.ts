import axios from "axios";
import { card } from "../../main/generated/prisma";
import { cardRepositoryInterface } from "../../repository/interface/cardRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { cardMicroservice, CardMicroserviceDTO } from "../../controller/schema/cardSchema";

export class CreateCardUsecase implements BaseUsecaseInterface<[number], card, [CardMicroserviceDTO]>{
    constructor( private cardRepository: cardRepositoryInterface ) {}

    async execute(cardId: number): Promise<card>{
        const response = await axios.get(`http://api-gateway:8080/card/${cardId}`);
        const parseResult = cardMicroservice.safeParse(response.data);
        
        if(!parseResult.success){
            throw new Error("Invalid card data from microservice: " + parseResult.error.errors[0].message);
        }

        const cardData = parseResult.data
        await this.validate(cardData);

        const createdCard = await this.cardRepository.create(cardData);
        return createdCard;
    }

    async validate(cardData: CardMicroserviceDTO){
        if (cardData.price < 0) {
          throw new Error("Card price must be non-negative.");
        }

        if (!["creature", "spell", "land", "artifact"].includes(cardData.type.toLowerCase())) {
          throw new Error("Invalid card type: " + cardData.type);
        }
    
        const allowedColors = ["white", "blue", "black", "red", "green", "colorless"];
        if (!allowedColors.includes(cardData.color.toLowerCase())) {
          throw new Error("Invalid card color: " + cardData.color);
        }
    }
}