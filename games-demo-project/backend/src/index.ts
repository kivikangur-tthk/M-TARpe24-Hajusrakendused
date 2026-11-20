import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express"
import swaggerDoc from "./docs/swagger-autogen.json" with { type: "json" }
import { sync } from "./db.ts"
import appRoutes from "./routes/appRoutes.ts";
import cookieParser from "cookie-parser";

const port = process.env.PORT;
const host = process.env.HOST || "localhost";

const app = express();

const frontendURL = process.env.FRONTEND_URL;

if(!process.env.JWT_SECRET || !frontendURL) {
    throw new Error ("SIRE! DO CONFIGURE THE TOKEN SECRET AND THYNE FRONT END ADDRESS - POST HASTE!")
}

app.use(cors({
    origin: frontendURL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
    }
    const origin = req.get("Origin")
    if(origin !== frontendURL) {
        return res.status(403).send({error: "Request origin not allowed"})
    }
    next();
})


app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
appRoutes(app);

app.listen(port, async () => {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`api jookseb aadressil http://${host}:${port}`)
})