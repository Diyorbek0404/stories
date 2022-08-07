import Router from "express";
const router = new Router();
import UserController from "../controllers/UserController.js"

router.post("/registration", UserController.registration)
router.post("/login", UserController.login)

export default router