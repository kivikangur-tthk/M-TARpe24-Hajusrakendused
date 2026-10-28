import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import * as UUID from "node:crypto";
import { DATE } from "sequelize";

const UserCollectionsController = {
    async create(req: express.Request, res: express.Response) {
        //check if req body has a user id
        //if not, use status 403
        //else, add into object to be created
        if (!req.body.CollectionName 
            || !req.body.GameIDs
            || !req.body.UserId
        ) {
            if (!req.body.UserId) {
                return res.status(403).send({error:"No user id specified, you must be logged in."})
            }
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        const starterJson = `{"GameIDs":"${req.body.GameIDs}"}`
        const gameIdToBeAddedToCollection = JSON.parse(starterJson)
        const newUserCollection = {
            id: uuidv7(),
            CollectionName: req.body.CollectionName,
            CollectionDescription: req.body.CollectionDescription,
            UserId: req.body.UserId, //later get real userid
            GameIDs: gameIdToBeAddedToCollection, //later get real gameidarray
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const addedUserCollection = await db.userCollections.create(newUserCollection)

        return res.location(`${Utilities.getBaseURL(req)}/usercollections/${addedUserCollection.id}`).sendStatus(201)
    },
    async getAll(req: express.Request, res: express.Response) {
        const userCollections = await db.userCollections.findAll();
        return res.status(200).send(userCollections.map(
            ({id,CollectionName}) => {return {id, CollectionName}}
        ))
    },
    // async getAllByUser(req: express.Request, res: express.Response) {
    // },
    async getById(req: express.Request, res: express.Response) {
        const userCollection = await UserCollectionsController.getUserCollection(req, res)
        if (!userCollection) {
            return            
        }
        return res.status(200).send(userCollection);
    },
    async getUserCollection(req: express.Request, res: express.Response) {
        let userCollectionID: string = req.params.id as string
        const userCollection = await db.userCollections.findByPk(userCollectionID)
        if (!userCollection) {
            res.status(404).send({error:"UserCollection with this id is not found: "+userCollectionID})
            return null;
        }
        return userCollection
    }
}
export default UserCollectionsController