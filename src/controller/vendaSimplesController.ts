import { Request, Response } from "express";
import { vendaSimplesRepositoryInterface } from "../repository/interface/vendaSimplesRepositoryInterface";
import { vendaSimplesRepository } from "../repository/vendaSimplesRepository";
import { CreateVendaSimplesUsecase } from "../usecase/VendaSimples/CreateVendaSimplesUsecase";
import { vendaSimplesSchema, vendaSimplesIdParamSchema } from "./schema/vendaSimplesSchema";
import { vendaSimples } from "../main/generated/prisma";
import { vendaSimplesDTO } from "../utils/dto/vendaSimplesDTO";
import { itemRepositoryInterface } from "../repository/interface/itemRepositoryInterface";
import { itemRepository } from "../repository/itemRepository";
import { deckRepositoryInterface } from "../repository/interface/deckRepositoryInterface";
import { deckRepository } from "../repository/deckRepository";
import { cardRepositoryInterface } from "../repository/interface/cardRepositoryInterface";
import { cardRepository } from "../repository/cardRepository";
import { GetAllVendaSimplesUseCase } from "../usecase/VendaSimples/GetAllVendaSimplesUsecase";
import { GetVendaSimplesByIdUseCase } from "../usecase/VendaSimples/GetVendaSimplesByIdUsecase";
import { DeleteVendaSimplesByIdUseCase } from "../usecase/VendaSimples/DeleteVendaSimplesByIdUsecase";
import { UpdateVendaSimplesByIdUsecase } from "../usecase/VendaSimples/UpdateVendaSimplesByIdUsecase";

export class vendaSimplesController {
    constructor(){}

    static async createVendaSimples(req: Request, res: Response)
    {
        try {
            const parseResult = vendaSimplesSchema.safeParse(req.body);

            if(!parseResult.success){
                throw new Error(parseResult.error.errors[0].message);
            }

            const { preco, deckId, cardId } = parseResult.data;
            const vendaData: vendaSimplesDTO = { preco, deckId, cardId };

            const createVenda = new CreateVendaSimplesUsecase(vendaSimplesController.getVendaSimplesRepository(),
                                                              vendaSimplesController.getItemRepository(),
                                                              vendaSimplesController.getDeckRepository(),
                                                              vendaSimplesController.getCardRepository());

            const createdVenda:vendaSimples = await createVenda.execute(vendaData);

            if(!createdVenda){
                throw new Error("Failed to create a Sale");
            }

            res.status(201).json({ message: "Sale created successfully" });

        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    static async getAllVendaSimples(req: Request, res: Response)
    {
        try {
            const getAllVendaSimplesUsecase = new GetAllVendaSimplesUseCase(vendaSimplesController.getVendaSimplesRepository());
            const vendas: vendaSimples[] = await getAllVendaSimplesUsecase.execute();
            
            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async getVendaSimplesById(req: Request, res: Response)
    {
        try {
            const {vendaSimplesId} = vendaSimplesIdParamSchema.parse(req.params);
            if(!vendaSimplesId){
                throw new Error("Venda Simples ID is required");
            }
            const getVendaSimplesByIdUsecase = new GetVendaSimplesByIdUseCase(vendaSimplesController.getVendaSimplesRepository());
            const venda: vendaSimples | null = await getVendaSimplesByIdUsecase.execute(vendaSimplesId);

            if(!venda){
                throw new Error("venda not found");
            }

            res.status(200).json(venda);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async deleteVendaSimplesById(req: Request, res: Response)
    {
        try {
            const {vendaSimplesId} = vendaSimplesIdParamSchema.parse(req.params);

            const deleteVendaSimplesUsecase = new DeleteVendaSimplesByIdUseCase(vendaSimplesController.getVendaSimplesRepository());
            await deleteVendaSimplesUsecase.execute(vendaSimplesId);

            res.status(200).json({ message: "Venda Simples deleted successfully" });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateVendaSimplesById(req: Request, res: Response)
    {
        try {
            const {vendaSimplesId} = vendaSimplesIdParamSchema.parse(req.params);
            const parseResult = vendaSimplesSchema.partial().safeParse(req.body);
            if(!parseResult.success){
                throw new Error(parseResult.error.errors[0].message);
            }
            const vendaSimplesData = parseResult.data;

            const updateVendaSimplesUsecase = new UpdateVendaSimplesByIdUsecase(vendaSimplesController.getVendaSimplesRepository(),
                                                                                vendaSimplesController.getItemRepository(),
                                                                                vendaSimplesController.getDeckRepository(),
                                                                                vendaSimplesController.getCardRepository());
            await updateVendaSimplesUsecase.execute(vendaSimplesId, vendaSimplesData);

            res.status(200).json({ message: "Venda Simples updated successfully" });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static getVendaSimplesRepository(): vendaSimplesRepositoryInterface{
        return new vendaSimplesRepository();
    }

    static getItemRepository(): itemRepositoryInterface{
        return new itemRepository();
    }

    static getDeckRepository(): deckRepositoryInterface{
        return new deckRepository();
    }

    static getCardRepository(): cardRepositoryInterface{
        return new cardRepository();
    }
}