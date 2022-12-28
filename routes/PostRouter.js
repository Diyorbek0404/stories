import Router from "express";
const router = new Router();
import PostController from "../controllers/PostController.js";

router.post("/", PostController.createPost)
router.get("/", PostController.getAllPost)
router.get("/:id", PostController.getById)
router.put("/:id", PostController.updateById)
router.put("/:id/notification", PostController.setNotification)
router.get("/1/pinned", PostController.getPinned)
router.get("/1/archive", PostController.getArchive)
router.delete("/:id", PostController.deletePost)
router.put("/:id/addtoarchive", PostController.addToArchive)
router.put("/:id/backfromarchive", PostController.backFromArchive)
router.put("/:id/addtopinned", PostController.addToPinned)
router.put("/:id/backfrompinned", PostController.backFromPinned)

export default router