import * as express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const UsersController = {
    async create(req: express.Request, res: express.Response) {
        if (!req.body.UserName || 
        !req.body.EmailAddress ||
        !req.body.Password ||
        !req.body.PasswordConfirmation) {
            return res.status(400)
            .send({error:"Missing parameters, please check your info."})
        }
        if (req.body.Password != req.body.PasswordConfirmation) 
            {
            return res.status(406)
            .send({error:"Passwords do not match, please check your info."})            
        }

        const passwordHash = await Utilities.gimmePassword(req.body.Password)

        const result = await db.users.create({
            id: uuidv7(),
            UserName: req.body.UserName,
            EmailAddress: req.body.EmailAddress,
            UserStatus: "unverified",
            PasswordHash: passwordHash
        });

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`).sendStatus(201);

    }
}
export default UsersController
