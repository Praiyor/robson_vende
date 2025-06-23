import { Request, Response } from "express";
import { vendaLeilaoRepositoryInterface } from "../repository/interface/vendaLeilaoRepositoryInterface";
import { vendaLeilaoRepository } from "../repository/vendaLeilaoRepository";
import { vendaLeilaoIdParamSchema, vendaLeilaoPartialSchema, vendaLeilaoSchema } from './schema/vendaLeilaoSchema';
import { vendaLeilao } from '../main/generated/prisma/index';

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

            const createVendaLeilao = new CreateVendaLeilaoUsecase(vendaLeilaoController.getVendaLeilaoRepository());
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
            const getAllVendaLeilaoUsecase = new GetAllVendaLeilaoUsecase(vendaLeilaoController.getVendaLeilaoRepository());
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
            const getVendaLeilaoByIdUsecase = new GetVendaLeilaoByIdUsecase(vendaLeilaoController.getVendaLeilaoRepository());
            const venda: vendaLeilao | null = await getVendaLeilaoByIdUsecase.execute(vendaLeilaoId);

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
            const deleteVendaLeilaoUsecase = new DeleteVendaLeilaoByIdUsecase(vendaLeilaoController.getVendaLeilaoRepository());
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

            const updateVendaLeilaoUsecase = new UpdateVendaLeilaoById(vendaLeilaoController.getVendaLeilaoRepository());
            await updateVendaLeilaoUsecase.execute(vendaLeilaoId, vendaLeilaoData);

            res.status(200).json({ message: "Venda Leilão updated successfully" });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static getVendaLeilaoRepository(): vendaLeilaoRepositoryInterface{
        return new vendaLeilaoRepository();
    }
}