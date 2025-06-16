import express from "express";
import { vendaSimplesRoutes } from "./routes/vendaSimplesRoutes";
import { vendaLeilaoRoutes } from "./routes/vendaLeilaoRoutes";

const app = express();

const PORT = 9455;

app.use(express.json());
app.use('/venda', vendaSimplesRoutes);
app.use('/leilao', vendaLeilaoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})