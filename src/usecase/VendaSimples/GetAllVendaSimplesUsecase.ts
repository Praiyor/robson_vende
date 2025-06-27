import { vendaSimples } from "../../main/generated/prisma";
import { vendaSimplesRepositoryInterface } from "../../repository/interface/vendaSimplesRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";

export class GetAllVendaSimplesUseCase implements BaseUsecaseInterface<[], vendaSimples[]> {
    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface){}

    async execute(): Promise<vendaSimples[]> {
        await this.validate();
        return await this.vendaSimplesRepository.findAll();
    }

    async validate(){
        if(!this.vendaSimplesRepository){
            throw new Error("Server error trying to get all the Venda Simples");
        }
    };
}