import { Express } from "express"
import GamesController from "../controllers/GamesController.ts"

export default (app: Express): void => {
    app.route("/games")
        .get(GamesController.getAll)
        .post(GamesController.create)
    app.route("/games/:id")
        .get(GamesController.getById)
        .put(GamesController.updateById)
        .delete(GamesController.deleteById)
}