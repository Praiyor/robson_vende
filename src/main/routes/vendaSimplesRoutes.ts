import { Router } from "express";
import { vendaSimplesController } from "../../controller/vendaSimplesController";

const router = Router();

router.get("/", vendaSimplesController.getAllVendaSimples);

export { router as vendaSimplesRoutes };