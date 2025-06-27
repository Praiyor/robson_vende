import { vendaLeilaoRepositoryInterface } from "../../repository/interface/vendaLeilaoRepositoryInterface";
import { BaseUsecaseInterface } from "../interface/BaseUsecaseInterface";
import { GetVendaLeilaoByIdUseCase } from "./GetVendaLeilaoByIdUsecase";

export class DeleteVendaLeilaoByIdUseCase implements BaseUsecaseInterface<[number], void> {
    constructor(private vendaLeilaoRepository: vendaLeilaoRepositoryInterface){}

    async execute(vendaLeilaoId: number): Promise<void> {
        await this.validate(vendaLeilaoId);
        await this.vendaLeilaoRepository.deleteById(vendaLeilaoId);
    }

    async validate(vendaLeilaoId: number){
        const getVendaLeilao = new GetVendaLeilaoByIdUseCase(this.vendaLeilaoRepository);
        const vendaLeilao = await getVendaLeilao.execute(vendaLeilaoId);

        if(!this.vendaLeilaoRepository){
            throw new Error("Server error trying to get the Venda Leilao");
        }

        if(!vendaLeilao){
            throw new Error(`Venda Leilao with id ${vendaLeilaoId} not found`)
        }
    };
}