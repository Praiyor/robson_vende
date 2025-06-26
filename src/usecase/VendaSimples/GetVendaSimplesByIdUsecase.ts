import { vendaSimples } from "../../main/generated/prisma";
import { vendaSimplesRepositoryInterface } from "../../repository/interface/vendaSimplesRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";

export class GetVendaSimplesByIdUseCase implements BaseUsecaseInterface<[number], vendaSimples | null> {
    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface){}

    async execute(vendaSimplesId: number): Promise<vendaSimples | null> {
        this.validate();
        return await this.vendaSimplesRepository.findById(vendaSimplesId);
    }

    async validate(){
        if(!this.vendaSimplesRepository){
            throw new Error("Server error trying to get the Venda Simples");
        }
    };
}