import { Router } from "express";
import { vendaSimplesController } from "../../controller/vendaSimplesController";

const router = Router();

router.get("/", vendaSimplesController.getAllVendaSimples);
router.get("/:vendaSimplesId", vendaSimplesController.getVendaSimplesById);
router.post("/", vendaSimplesController.createVendaSimples);
router.put("/:vendaSimplesId", vendaSimplesController.updateVendaSimplesById);
router.delete("/:vendaSimplesId", vendaSimplesController.deleteVendaSimplesById);

export { router as vendaSimplesRoutes };