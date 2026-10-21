import { Request, Response } from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import { UUID } from "node:crypto";

const UserCollectionsController = {
    async create(req: Request, res: Response) {
        const userWhoUploaded = "userid"
        const gameIdToBeAddedToCollection = ["gameid"]
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
        const newUserCollection = {
            id: uuidv7(),
            CollectionName: req.body.CollectionName,
            CollectionDescription: req.body.CollectionDescription,
            UserId: userWhoUploaded, //later get real userid
            GameId: gameIdToBeAddedToCollection //later get real gameidarray
        }
        const addedUserCollection = await db.userCollections.create(newUserCollection)

        return res.location(`${Utilities.getBaseURL(req)}/usercollections/${addedUserCollection.id}`).sendStatus(201)
    }
}