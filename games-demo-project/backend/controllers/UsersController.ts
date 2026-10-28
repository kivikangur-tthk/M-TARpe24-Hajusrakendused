import * as express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { User } from "../models/User.ts"

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

    },
    async getAll(req: express.Request, res: express.Response) {
        const users = await db.users.findAll();
        console.log("getAll"+users)
        return res.status(200).send(users.map(
            ({id, UserName, UserStatus, EmailAddress }) => {return {id, UserName, UserStatus, EmailAddress}}
        ))
    },
    async getById(req: express.Request, res: express.Response) {
        const user = await UsersController.getUser(req, res)
        if (!user) {
            return
        }
        return res.status(200).send(user)
    },
    async modifyById(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            return res.status(400).send({"error":"No id supplied"})
        }
        const userToBeModified = await UsersController.getUser(req, res)
        if (!req.body) {
            return res.status(400).send({"error":"No body was supplied, nothing was changed"})
        }
        const modifiedUser = new User
        if (req.body.UserName) {
            modifiedUser.UserName = req.body.UserName
        }
        if (req.body.PasswordHash) {
            modifiedUser.PasswordHash = req.body.PasswordHash
        }
        if (req.body.UserStatus) {
            modifiedUser.UserStatus = req.body.UserStatus
        }
        if (req.body.UserCollectionID) {
            modifiedUser.UserCollectionID = req.body.UserCollectionID
        }
        if (req.body.UserCollectionID) {
            modifiedUser.UserCollectionID = req.body.UserCollectionID
        }
        if (req.body.ReviewListID) {
            modifiedUser.ReviewListID = req.body.ReviewListID
        }
        if (req.body.ProfileID) {
            modifiedUser.ProfileID = req.body.ProfileID
        }
        if (req.body.EmailAddress) {
            modifiedUser.EmailAddress = req.body.EmailAddress
        }
        if (req.body.CredentialID) {
            modifiedUser.CredentialID = req.body.CredentialID
        }
        modifiedUser.updatedAt = new Date()
        await db.users.update(modifiedUser, {
            where: {
                id: req.params.id
            }
        })
        return res.location(`${Utilities.getBaseURL(req)}/users/${modifiedUser}`).status(201).send(modifiedUser)
    },
    async getUser(req: express.Request, res: express.Response) {
        let userID: string = req.params.id as string
        //console.log(userID)
        const user = await db.users.findByPk(userID);
        if(!user) {
            res.status(404).send(
                {
                    error: `user with this id does not exist: ${userID}`
                }
            )
            return null;
        }
        return user;
    }
}
export default UsersController
