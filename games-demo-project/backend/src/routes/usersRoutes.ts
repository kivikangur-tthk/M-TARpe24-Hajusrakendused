import express from "express";
import checkReqestBody from "../controllers/middleware/checkRequestBody.ts";
import jwtAuth from "../controllers/middleware/jwtAuth.ts"
import UsersController from "../controllers/UsersController.ts";

const router = express.Router();

router.get("/", jwtAuth, UsersController.getAll);
router.post("/", checkReqestBody, UsersController.create);
router.get("/:id", jwtAuth, UsersController.getById);
router.put("/:id", jwtAuth, checkReqestBody, UsersController.modifyById);
router.delete("/:id", jwtAuth, UsersController.deleteById);

export default router;
