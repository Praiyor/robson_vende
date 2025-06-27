import { vendaLeilao } from "../../main/generated/prisma";
import { vendaLeilaoRepositoryInterface } from "../../repository/interface/vendaLeilaoRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";

export class GetVendaLeilaoByIdUseCase implements BaseUsecaseInterface<[number], vendaLeilao | null> {
    constructor(private vendaLeilaoRepository: vendaLeilaoRepositoryInterface){}

    async execute(vendaLeilaoId: number): Promise<vendaLeilao | null> {
        await this.validate();
        return await this.vendaLeilaoRepository.findById(vendaLeilaoId);
    }

    async validate(){
        if(!this.vendaLeilaoRepository){
            throw new Error("Server error trying to get the Venda Leilao");
        }
    };
}