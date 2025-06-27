import { Router } from "express";
import { vendaLeilaoController } from "../../controller/vendaLeilaoController";

const router = Router();

router.get("/", vendaLeilaoController.getAllVendaLeilao);
router.get("/:vendaLeilaoId", vendaLeilaoController.getVendaLeilaoById);
router.post("/", vendaLeilaoController.createVendaLeilao);
router.put("/:vendaLeilaoId", vendaLeilaoController.updateVendaLeilaoById);
router.delete("/:vendaLeilaoId", vendaLeilaoController.deleteVendaLeilaoByid);

export { router as vendaLeilaoRoutes };