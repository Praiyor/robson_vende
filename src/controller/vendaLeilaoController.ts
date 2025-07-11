import { Request, Response } from "express";
import { vendaLeilaoRepositoryInterface } from "../repository/interface/vendaLeilaoRepositoryInterface";
import { vendaLeilaoRepository } from "../repository/vendaLeilaoRepository";
import { vendaLeilaoIdParamSchema, vendaLeilaoPartialSchema, vendaLeilaoSchema } from './schema/vendaLeilaoSchema';
import { vendaLeilao } from '../main/generated/prisma/index';
import { cardRepositoryInterface } from "../repository/interface/cardRepositoryInterface";
import { deckRepositoryInterface } from "../repository/interface/deckRepositoryInterface";
import { itemRepositoryInterface } from "../repository/interface/itemRepositoryInterface";
import { itemRepository } from "../repository/itemRepository";
import { deckRepository } from "../repository/deckRepository";
import { cardRepository } from "../repository/cardRepository";
import { CreateVendaLeilaoUsecase } from "../usecase/VendaLeilao/CreateVendaLeilaoUsecase";
import { GetAllVendaLeilaoUseCase } from "../usecase/VendaLeilao/GetAllVendaLeilaoUsecase";
import { GetVendaLeilaoByIdUseCase } from "../usecase/VendaLeilao/GetVendaLeilaoByIdUsecase";
import { DeleteVendaLeilaoByIdUseCase } from "../usecase/VendaLeilao/DeleteVendaLeilaoByIdUsecase";

export class vendaLeilaoController {
    constructor(){}

    static async createVendaLeilao(req: Request, res: Response){
        try {
            const parseResult = vendaLeilaoSchema.safeParse(req.body);

            if(!parseResult.success){
                throw new Error(parseResult.error.errors[0].message);
            }

            const { preco, inicio, fim, deckId, cardId } = parseResult.data;
            const vendaLeilaoData = { preco, inicio, fim, deckId, cardId };

            const createVendaLeilao = new CreateVendaLeilaoUsecase(vendaLeilaoController.getVendaLeilaoRepository(),
                                                                vendaLeilaoController.getItemRepository(),
                                                                vendaLeilaoController.getDeckRepository(),
                                                                vendaLeilaoController.getCardRepository());
            const createdVenda = await createVendaLeilao.execute(vendaLeilaoData);
            
            if(!createdVenda){
                throw new Error("Failed to create a Leilão Sale");
            }

            res.status(201).json({ message: "Leilão Sale created successfully" });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async getAllVendaLeilao(req: Request, res: Response){
        try {
            const getAllVendaLeilaoUsecase = new GetAllVendaLeilaoUseCase(vendaLeilaoController.getVendaLeilaoRepository());
            const vendas: vendaLeilao[] = await getAllVendaLeilaoUsecase.execute();

            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async getVendaLeilaoById(req: Request, res: Response){
        try {
            const { vendaLeilaoId } = vendaLeilaoIdParamSchema.parse(req.params);
            if(!vendaLeilaoId){
                throw new Error("Venda Leilão ID is required");
            }
            const getVendaLeilaoByIdUsecase = new GetVendaLeilaoByIdUseCase(vendaLeilaoController.getVendaLeilaoRepository());
            const venda: vendaLeilao | null = await getVendaLeilaoByIdUsecase.execute(vendaLeilaoId);

            if(!venda){
                throw new Error("venda not found");
            }

            res.status(200).json(venda);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async deleteVendaLeilaoByid(req: Request, res: Response){
        try {
            const { vendaLeilaoId } = vendaLeilaoIdParamSchema.parse(req.params);
            if(!vendaLeilaoId){
                throw new Error("Venda Leilão ID is required");
            }
            const deleteVendaLeilaoUsecase = new DeleteVendaLeilaoByIdUseCase(vendaLeilaoController.getVendaLeilaoRepository());
            await deleteVendaLeilaoUsecase.execute(vendaLeilaoId);

            res.status(200).json({ message: "Venda Leilão deleted successfully" });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateVendaLeilaoById(req: Request, res: Response){
        try {
            const { vendaLeilaoId } = vendaLeilaoIdParamSchema.parse(req.params);
            const parseResult = vendaLeilaoPartialSchema.partial().safeParse(req.body);
            if(!parseResult.success){
                throw new Error(parseResult.error.errors[0].message);
            }
            const vendaLeilaoData = parseResult.data;

            const updateVendaLeilaoUsecase = new UpdateVendaLeilaoByIdUsecase(vendaLeilaoController.getVendaLeilaoRepository());
            await updateVendaLeilaoUsecase.execute(vendaLeilaoId, vendaLeilaoData);

            res.status(200).json({ message: "Venda Leilão updated successfully" });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static getVendaLeilaoRepository(): vendaLeilaoRepositoryInterface{
        return vendaLeilaoRepository.getInstance();
    }

    static getItemRepository(): itemRepositoryInterface{
        return itemRepository.getInstance();
    }

    static getDeckRepository(): deckRepositoryInterface{
        return deckRepository.getInstance();
    }

    static getCardRepository(): cardRepositoryInterface{
        return cardRepository.getInstance();
    }
}