import express from "express";
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts";
import UsersController from "../controllers/UsersController.ts";

const router = express.Router();

router.get("/", UsersController.getAll);
router.post("/", checkReqestBody, UsersController.create);
router.get("/:id", UsersController.getById);
router.put("/:id", checkReqestBody, UsersController.modifyById);
router.delete("/:id", UsersController.deleteById);

export default router;
