import { Request, Response } from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

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
        const gameID: string = req.params.Id
        console.log(gameId)
        const game = await db.games.findByPk(gameID);
        if (!game) {
            res.status(404).send({
                error: `Game with this ID is not found. ${gameID}`
            })
            return null;
        }
        return game;
    }
}

export default GamesController