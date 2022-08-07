import {Router} from "express";
const router  = new Router()
import UserRouter from "./UserRouter.js"
import PostRouter from "./PostRouter.js"
import CategoryRouter from "./CategoryRouter.js"

router.use("/auth", UserRouter)
router.use("/post", PostRouter)
router.use("/category", CategoryRouter)

export default router