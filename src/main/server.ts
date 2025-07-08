import express from "express";
import { vendaSimplesRoutes } from "./routes/vendaSimplesRoutes";
import { vendaLeilaoRoutes } from "./routes/vendaLeilaoRoutes";
import client from "prom-client";

const app = express();

const PORT = 9455;

app.use(express.json());
app.use('/venda', vendaSimplesRoutes);
app.use('/leilao', vendaLeilaoRoutes);

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})