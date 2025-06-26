import axios from "axios";
import { deck } from "../../main/generated/prisma";
import { deckRepositoryInterface } from "../../repository/interface/deckRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { deckMicroservice, DeckMicroserviceDTO } from "../../controller/schema/deckSchema";
import { deckDTO } from "../../utils/dto/deckDTO";

export class CreateDeckUsecase implements BaseUsecaseInterface<[number, number], deck, [DeckMicroserviceDTO]>{
    constructor( private deckRepository: deckRepositoryInterface ) {}

    async execute(deckId: number, itemId: number): Promise<deck>{
        const response = await axios.get(`http://api-gateway:8080/decks/${deckId}`);
        const parseResult = deckMicroservice.safeParse(response.data);

        if(!parseResult.success){
            throw new Error("Invalid deck data from microservice: " + parseResult.error.errors[0].message);
        }

        await this.validate(parseResult.data);

        const deckData:deckDTO = {
            id: parseResult.data.id,
            name: parseResult.data.name,
            description: parseResult.data.description,
            deckSize: parseResult.data.cards.length,
            itemId: itemId
        };

        const deckCreated = await this.deckRepository.create(deckData);
        return deckCreated;
    }

    async validate(deckData: DeckMicroserviceDTO){
        const totalCards = deckData.cards.length;

        if(deckData.format.toLowerCase() === "commander" || deckData.format.toLowerCase() === "singleton"){
            if(deckData.exactCards !== totalCards){
                throw new Error("Deck must contain exactly " +  deckData.exactCards);
            }
        } else{
            if( totalCards < deckData.minCards ){
                throw new Error("Deck must contain at least " +  deckData.minCards);
            }
        }
    }
}