import { Express } from "express"
import GamesController from "../controllers/GamesController.ts"
import UsersController from "../controllers/UsersController.ts"

export default (app: Express): void => {
    app.route("/games")
        .get(GamesController.getAll)
        .post(GamesController.create)
    app.route("/games/:id")
        .get(GamesController.getById)
        .put(GamesController.updateById)
        .delete(GamesController.deleteById)
    app.route("/users")
        .get(UsersController.getAll)
        .post(UsersController.create)
    app.route("/users/:id")
        .get(UsersController.getById)
        .put(UsersController.updateById)
        .delete(UsersController.deleteById)
}