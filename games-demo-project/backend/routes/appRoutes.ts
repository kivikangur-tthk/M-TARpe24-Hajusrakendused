import type express from "express"
import GamesController from "../controllers/GamesController.ts"
import UsersController from "../controllers/UsersController.ts"
import UserCollectionsController from "../controllers/UserCollectionsController.ts"

export default (app: express.Application): void => {
    app.route("/games")
        .get(GamesController.getAll)
        .post(GamesController.create)
    app.route("/games/:id")
        .get(GamesController.getByID)
        .put(GamesController.modifyById)
        .delete(GamesController.deleteById)
    app.route("/users")
        .get(UsersController.getAll)
        .post(UsersController.create)
    app.route("/users/:id")
        .get(UsersController.getById)
        .put(UsersController.modifyById)
        .delete(UsersController.deleteById)
    app.route("/usercollections/")
        .get(UserCollectionsController.getAll)
        .post(UserCollectionsController.create)
    app.route("/usercollections/:id")
        .get(UserCollectionsController.getById)
        .put(UserCollectionsController.modifyById)
        .delete(UserCollectionsController.deleteById)
}