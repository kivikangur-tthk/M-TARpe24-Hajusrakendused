import "dotenv/config";
import express from "express";
import cors from "cors";
import { sync } from "../db.ts"

import appRoutes from "../routes/appRoutes.ts";

const port = process.env.PORT;
const host = "localhost";

const app = express();

app.use(cors())
app.use(express.json())
appRoutes(app);

app.listen(port, async () => {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`api jookseb aadressil http://${host}:${port}`)
})