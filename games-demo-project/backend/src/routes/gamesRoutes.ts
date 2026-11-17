import express from "express";
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts";
import GamesController from "../controllers/GamesController.ts";

const router = express.Router();

router.get("/", GamesController.getAll);
router.post("/", checkReqestBody, GamesController.create);
router.get("/:id", GamesController.getByID);
router.put("/:id", checkReqestBody, GamesController.modifyById);
router.delete("/:id", GamesController.deleteById);

export default router;
