import express from "express";
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts";
import UserCollectionsController from "../controllers/UserCollectionsController.ts";

const router = express.Router();

router.get("/", UserCollectionsController.getAll);
router.post("/", checkReqestBody, UserCollectionsController.create);
router.get("/:id", UserCollectionsController.getById);
router.put("/:id", checkReqestBody, UserCollectionsController.modifyById);
router.delete("/:id", UserCollectionsController.deleteById);

export default router;
