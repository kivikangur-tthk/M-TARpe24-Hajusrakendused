import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import * as UUID from "node:crypto";
import { DATE } from "sequelize";

const UserCollectionsController = {
    async create(req: express.Request, res: express.Response) {
        const userWhoUploaded = "9f6a98e7-d13d-11f1-8dc2-901b0eec5991"
        //check if req body has a user id
        //if not, use status 403
        //else, add into object to be created
        if (!req.body.CollectionName 
            || !req.body.GameId
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        const starterJson = `{"GameIDs":"${req.body.GameId}"}`
        const gameIdToBeAddedToCollection = JSON.parse(starterJson)
        const newUserCollection = {
            id: uuidv7(),
            CollectionName: req.body.CollectionName,
            CollectionDescription: req.body.CollectionDescription,
            UserId: userWhoUploaded, //later get real userid
            GameIDs: gameIdToBeAddedToCollection, //later get real gameidarray
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const addedUserCollection = await db.userCollections.create(newUserCollection)

        return res.location(`${Utilities.getBaseURL(req)}/usercollections/${addedUserCollection.id}`).sendStatus(201)
    }
}
export default UserCollectionsController