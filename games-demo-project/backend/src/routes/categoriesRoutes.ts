import express from "express";
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts";
import CategoriesController from "../controllers/CategoriesController.ts";

const router = express.Router();

router.get("/", CategoriesController.getAll);
router.post("/", checkReqestBody, CategoriesController.create);
router.get("/:id", CategoriesController.getById);
router.put("/:id", checkReqestBody, CategoriesController.modifyById);
router.delete("/:id", CategoriesController.deleteById);

export default router;
