import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express"
import swaggerDoc from "./docs/swagger-autogen.json" with { type: "json" }
import { sync } from "./db.ts"
import appRoutes from "./routes/appRoutes.ts";

const port = process.env.PORT;
const host = process.env.HOST || "localhost";

const app = express();

app.use(cors())
app.use(express.json())
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
appRoutes(app);

app.listen(port, async () => {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`api jookseb aadressil http://${host}:${port}`)
})