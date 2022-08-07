import Router from "express";
const router = new Router();
import PostController from "../controllers/PostController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";


router.post("/", checkRole("User"), PostController.createPost)
router.get("/", checkRole("User"), PostController.getAllPost)
router.get("/:id", checkRole("User"), PostController.getById)
router.put("/:id/likes", checkRole("User"), PostController.likePost)
router.delete("/:id", checkRole("User"), PostController.deletePost)

export default router