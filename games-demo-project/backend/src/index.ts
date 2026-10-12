import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { sync } from "../db"

import appRoutes from "../routes/appRoutes";

dotenv.config()

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