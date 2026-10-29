import type express from "express"
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts"
import GamesController from "../controllers/GamesController.ts"
import UsersController from "../controllers/UsersController.ts"
import UserCollectionsController from "../controllers/UserCollectionsController.ts"
import CategoriesController from "../controllers/CategoriesController.ts"

export default (app: express.Application): void => {

    app.route("/games")
        .get(GamesController.getAll)
        .post(checkReqestBody, GamesController.create)
    app.route("/games/:id")
        .get(GamesController.getByID)
        .put(checkReqestBody, GamesController.modifyById)
        .delete(GamesController.deleteById)

    app.route("/users")
        .get(UsersController.getAll)
        .post(checkReqestBody, UsersController.create)
    app.route("/users/:id")
        .get(UsersController.getById)
        .put(checkReqestBody, UsersController.modifyById)
        .delete(UsersController.deleteById)

    app.route("/usercollections/")
        .get(UserCollectionsController.getAll)
        .post(checkReqestBody, UserCollectionsController.create)
    app.route("/usercollections/:id")
        .get(UserCollectionsController.getById)
        .put(checkReqestBody, UserCollectionsController.modifyById)
        .delete(UserCollectionsController.deleteById)

    app.route("/categories/")
        .get(CategoriesController.getAll)
        .post(checkReqestBody, CategoriesController.create)
    app.route("/categories/:id")
        .get(CategoriesController.getById)
        .put(checkReqestBody, CategoriesController.modifyById)
        .delete(CategoriesController.deleteById)
}