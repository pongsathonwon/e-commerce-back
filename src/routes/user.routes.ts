import { Router } from "express";
import { tokenGuard } from "../middleware";

const userRoute = Router()
userRoute.get("/:id", tokenGuard) // get user profile by id
userRoute.put("/:id", tokenGuard) // update own profile