import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import type { Game } from "../models/Game.ts";

const GamesController = {
    async create(req: express.Request, res: express.Response)  {
        const requiredFields = ['GameName', 'GameDescription', 'ReleaseDate', 'CategoryID'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).send({
                error: "Missing parameters, please review data",
                missing: missingFields
            });
        }

        const newGame = {
            id: uuidv7(),
            GameName: req.body.GameName,
            GameDescription: req.body.GameDescription,
            ReleaseDate: req.body.ReleaseDate,
            CategoryID: req.body.CategoryID,
            ImageURL: req.body.ImageURL,
            IsOwnedBy: 0,
        }
        const createdGame = await db.games.create(newGame);

        return res
        .location(`${Utilities.getBaseURL(req)}/games/${createdGame.id}`).sendStatus(201);
    },

    async getAll(req: express.Request, res: express.Response) {
        const games = await db.games.findAll();
        console.log("getAll: "+games)
        return res
        .status(200)
        .send(
            games.map
            (
                ({id, GameName}) => {return {id, GameName}}
            )
        )
    },

    async getByID(req: express.Request, res: express.Response) {
        
        const game = await GamesController.getGame(req, res)
        if (!game) {
            console.log("no game")
            return
        }
        console.log("Game is found")
        return res.status(200).send(game);
    },

    async modifyById(req: express.Request, res: express.Response) {
        if (!req.params.id) 
            {
                console.log(req.params.id)
                return res.status(400).send({"error":"No id supplied"})
            }     
            console.log(req.params.id)
        const gameToBeModified = await GamesController.getGame(req, res)
        console.log(gameToBeModified)
        if (!gameToBeModified) {
            console.log("Game not found")
            return res.status(404).send({"error":"Game not found with id "+gameToBeModified});
        }
        if (
            !req.body.GameName || 
            !req.body.GameDescription ||
            !req.body.ReleaseDate ||
            !req.body.CategoryID
        ) {
            console.log(req.body.GameName+" "+req.body.GameDescription+" "+req.body.ReleaseDate+" "+req.body.CategoryID)
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        const modifiedGame = {

            GameName: req.body.GameName,
            GameDescription: req.body.GameDescription,
            ReleaseDate: req.body.ReleaseDate,
            CategoryID: req.body.CategoryID,
            ImageURL: req.body.ImageURL || null,
            Reviews: req.body.Reviews || null,
            Comments: req.body.Comments || null,
            updatedAt: new Date(),
        }

        console.log("---")
        console.log(modifiedGame)
        console.log("---")

        await db.games.update(modifiedGame, { where: {id: req.params.id}})

        return res.location(`${Utilities.getBaseURL(req)}/games/${gameToBeModified}`)
        .status(201)
        .send(modifiedGame)
    },

    async deleteById(req: express.Request, res: express.Response) {
        const gameToBeDeleted = await GamesController.getGame(req, res)
        if (!gameToBeDeleted) {
            return;
        }
        await gameToBeDeleted.destroy();
        return res.status(204)
        .send({error: "No content."})

    },

    async getGame(req: express.Request, res: express.Response) {
        let gameID: string = req.params.id as string
        console.log(gameID)
        const game = await db.games.findByPk(gameID);
        if (!game) {
            console.log("Game not found")
            res.status(404).send({
                error: `Game with this ID is not found. ${gameID}`
            })
            return null;
        }
        return game
    }
}

export default GamesController