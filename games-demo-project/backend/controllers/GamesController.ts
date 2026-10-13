import { Request, Response } from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";

const GamesController = {
    async create(req: Request, res: Response)  {
        if (
            !req.body.GameName || 
            !req.body.GameDescription ||
            !req.body.ReleaseDate ||
            !req.body.CategoryID
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
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
    async getAll(req: Request, res: Response) {
        const games = await db.games.findAll();
        console.log("getAll: "+games)
        return res
        .status(200)
        .send(
            games.map
            (
                ({Id, GameName}) => {return {Id, GameName}}
            )
        )
    },
    async getByID(req: Request, res: Response) {
        let gameID: String = req.params.Id as String
        console.log(gameID)
        const game = await db.games.findByPk(gameID);
        if (!game) {
            res.status(404).send({
                error: `Game with this ID is not found. ${gameID}`
            })
            return null;
        }
        return game;
    },
    async modifyById(req: Request, res: Response) {
        const gameToBeModified = await this.getByID(req, res)
        if (!gameToBeModified) {
            return;
        }
        if (
            !req.body.GameName || 
            !req.body.GameDescription ||
            !req.body.ReleaseDate ||
            !req.body.CategoryID ||
            !req.body.ImageURL ||
            !req.body.Reviews ||
            !req.body.Comments
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        gameToBeModified.GameName = req.body.GameName
        gameToBeModified.GameDescription = req.body.GameDescription
        gameToBeModified.ReleaseDate = req.body.ReleaseDate
        gameToBeModified.CategoryID = req.body.CategoryID
        gameToBeModified.ImageURL = req.body.ImageURL
        gameToBeModified.Reviews = req.body.Reviews
        gameToBeModified.Comments = req.body.Comments

        await gameToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/games/${gameToBeModified.id}`)
        .status(201)
        .send(gameToBeModified)
    },
    async deleteById(req: Request, res: Response) {
        const gameToBeDeleted = await this.getByID(req, res)
        if (!gameToBeDeleted) {
            return;
        }
        await gameToBeDeleted.destroy();
        return res.status(204)
        .send({error: "No content."})

    }
}

export default GamesController