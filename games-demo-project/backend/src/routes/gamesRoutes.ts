import express from "express";
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts";
import GamesController from "../controllers/GamesController.ts";

const router = express.Router();

router.get("/", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'List of all games',
        schema: [{ $ref: '#/definitions/GameListItem' }]
    } */
    next();
}, GamesController.getAll);

router.post("/", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewGame' }
    } */
    /* #swagger.responses[201] = {
        description: 'Game created',
        schema: { $ref: '#/definitions/Game' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkReqestBody, GamesController.create);

router.get("/:id", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'Game details',
        schema: { $ref: '#/definitions/Game' }
    } */
    /* #swagger.responses[404] = {
        description: 'Game not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, GamesController.getByID);

router.put("/:id", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewGame' }
    } */
    /* #swagger.responses[200] = {
        description: 'Game updated',
        schema: { $ref: '#/definitions/Game' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    /* #swagger.responses[404] = {
        description: 'Game not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkReqestBody, GamesController.modifyById);

router.delete("/:id", (req, res, next) => {
    /* #swagger.responses[204] = {
        description: 'Game deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'Game not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, GamesController.deleteById);

export default router;
