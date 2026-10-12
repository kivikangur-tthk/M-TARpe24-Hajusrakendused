import { Request } from "express";
//installi bcrypt hiljem, siia tuleb hashing ka

const Utilities = {
    getBaseURL(req: Request): string {
    return `${req.protocol}://${req.get("host")}`;
}}

export default Utilities