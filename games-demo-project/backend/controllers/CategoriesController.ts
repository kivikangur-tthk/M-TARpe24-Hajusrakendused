import * as express from "express"
import { db } from "../db.ts"
import Utilities from "./Utilities.ts"
import {v7 as uuidv7 } from "uuid"
import { Category } from "../models/Category.ts"

const CategoriesController = {
    async create (req: express.Request, res: express.Response) {
        const requiredFields = ["CategoryName","CategoryDescription"]
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).send({
                error: "Missing parameters, please check it before you wreck it",
                missing: missingFields
            })
        }
        const newCategory = {
        id: uuidv7(),
        CategoryName: req.body.CategoryName,
        CategoryDescription: req.body.CategoryDescription
        }

        const result = await db.categories.create(newCategory)
        return res.location(`${Utilities.getBaseURL(req)}/categories/${result.id}`).sendStatus(201)
    },
    async getAll(req: express.Request, res: express.Response) {
        const categories = await db.categories.findAll();
        return res.status(200).send(categories.map(
            ({id, CategoryName}) => {return {id, CategoryName}}
        ))
    },
    async getById(req: express.Request, res: express.Response) {
        const category = await CategoriesController.getCategory(req, res)
        if (!category) {
            return
        }
        return res.status(200).send(category)
    },
    async getCategory(req: express.Request, res: express.Response) {
        let categoryID: string = req.params.id as string
        const category = await db.categories.findByPk(categoryID);
        if (!category) {
            res.status(404).send(
                {
                    error: `Category with this ID is not found. ${categoryID}`
                }
            )
            return null
        } 
        return category
    }
}

export default CategoriesController