import type express from "express";
import gamesRoutes from "./gamesRoutes.ts";
import usersRoutes from "./usersRoutes.ts";
import userCollectionsRoutes from "./userCollectionsRoutes.ts";
import categoriesRoutes from "./categoriesRoutes.ts";
import authRoutes from "./authRoutes.ts"

export default (app: express.Application): void => {
    // Globaalne 500 vastus kõigile allolevatele otspunktidele
    app.use((req, res, next) => {
        /* #swagger.responses[500] = { 
            description: 'Internal Server Error' 
        } */
        next();
    });

    app.use("/games", (req, res, next) => {
        // #swagger.tags = ['Games']
        next();
    }, gamesRoutes);

    app.use("/users", (req, res, next) => {
        // #swagger.tags = ['Users']
        next();
    }, usersRoutes);

    app.use("/usercollections", (req, res, next) => {
        // #swagger.tags = ['UserCollections']
        next();
    }, userCollectionsRoutes);

    app.use("/categories", (req, res, next) => {
        // #swagger.tags = ['Categories']
        next();
    }, categoriesRoutes);

    app.use("/authentication", (req, res, next) => {
        // #swagger.tags = ['Authentication']
        next();
    }, authRoutes);
};
