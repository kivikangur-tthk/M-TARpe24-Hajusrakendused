import * as express from "express"
import { db } from "../db.ts"
import Utilities from "./Utilities.ts"
import {v7 as uuidv7 } from "uuid"
import { Category } from "../models/Category.ts"

const CategoriesController = {
    async create (req: express.Request, res: express.Response) {
        if (!req.body.CategoryName || !req.body.CategoryDescription) {
            return res.status(400).send({error: "Missing parameters, please check it before you wreck it"})
        }
        const newCategory = new Category
        newCategory.id = uuidv7()
        newCategory.CategoryName = req.body.CategoryName
        newCategory.CategoryDescription = req.body.CategoryDescription

        const result = await db.categories.create(newCategory)
        return res.location(`${Utilities.getBaseURL(req)}/categories/${result.id}`).sendStatus(201)
    }
}

export default CategoriesController