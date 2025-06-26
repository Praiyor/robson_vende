import { vendaSimplesRepositoryInterface } from "../../repository/interface/vendaSimplesRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { GetVendaSimplesByIdUseCase } from "./GetVendaSimplesByIdUsecase";

export class DeleteVendaSimplesByIdUseCase implements BaseUsecaseInterface<[number], void> {
    constructor(private vendaSimplesRepository: vendaSimplesRepositoryInterface){}

    async execute(vendaSimplesId: number): Promise<void> {
        this.validate(vendaSimplesId);
        await this.vendaSimplesRepository.deleteById(vendaSimplesId);
    }

    async validate(vendaSimplesId: number){
        const getVendaSimples = new GetVendaSimplesByIdUseCase(this.vendaSimplesRepository);
        const vendaSimples = await getVendaSimples.execute(vendaSimplesId);

        if(!this.vendaSimplesRepository){
            throw new Error("Server error trying to get all the Venda Simples");
        }

        if(!vendaSimples){
            throw new Error(`Venda Simples with id ${vendaSimplesId} not found`)
        }
    };
}