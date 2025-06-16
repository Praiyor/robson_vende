import { Router } from "express";
import { vendaLeilaoController } from "../../controller/vendaLeilaoController";

const router = Router();

router.get("/", vendaLeilaoController.getAllVendaLeilao);

export { router as vendaLeilaoRoutes };