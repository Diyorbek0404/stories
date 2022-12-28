import { Router } from "express";
const router = new Router()
import PostRouter from "./PostRouter.js"

router.use("/post", PostRouter)

export default router