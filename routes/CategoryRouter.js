import Router from "express";
const router = new Router();
import CategorryController from "../controllers/CategoryController.js"

router.post("/", CategorryController.createCategory)
router.get("/", CategorryController.getAllCategory)

export default router