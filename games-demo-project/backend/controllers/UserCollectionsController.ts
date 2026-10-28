import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import * as UUID from "node:crypto";
import { DATE } from "sequelize";
import type { UserCollection } from "../models/UserCollection.ts";

const UserCollectionsController = {
    async create(req: express.Request, res: express.Response) {
        //check if req body has a user id
        //if not, use status 403
        //else, add into object to be created
        /*test with this data, should create:
        {
    "UserId": "9f6a98e7-d13d-11f1-8dc2-901b0eec5991",
    "GameIDs": "ä,ö,ü",
    "CollectionName":"fresh games off the slopstack"
}*/
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
    async modifyById(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            console.log(req.params.id)
            return res.status(400).send({"error":"No id supplied"})
        }
        if (!req.body) {
            return res.status(400).send({"error":"No body was supplied, nothing was changed"})
        }

        const userCollectionToBeModified = await UserCollectionsController.getUserCollection(req, res)

        if (!userCollectionToBeModified) {
            return res.status(404).send({"error":"UserCollection not found with id "+req.params.id});
        }

        //eeldame et vaade annab vanad andmed ka kaasa
        const modifiedUserCollection = {
            CollectionName: req.body.CollectionName,
            CollectionDescription: req.body.CollectionDescription,
            GameIDs: req.body.GameIDs,
            UserId: req.body.UserId,
            createdAt: req.body.createdAt,
        } as UserCollection
        modifiedUserCollection.updatedAt = new Date()

        await db.userCollections.update(modifiedUserCollection, {
            where:{
                id: req.params.id
            }
        })
        return res.location(`${Utilities.getBaseURL(req)}/usercollections/${userCollectionToBeModified}`).status(201).send(modifiedUserCollection)

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