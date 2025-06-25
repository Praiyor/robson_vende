import { vendaLeilao } from "../../main/generated/prisma";
import { vendaLeilaoRepositoryInterface } from "../../repository/interface/vendaLeilaoRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";

export class GetAllVendaLeilaoUseCase implements BaseUsecaseInterface<[], vendaLeilao[]> {
    constructor(private vendaLeilaoRepository: vendaLeilaoRepositoryInterface){}

    async execute(): Promise<vendaLeilao[]> {
        this.validate();
        return await this.vendaLeilaoRepository.findAll()
    }

    async validate(){
        if(!this.vendaLeilaoRepository){
            throw new Error("Server error trying to get all the Venda Leilao");
        }
    };
}