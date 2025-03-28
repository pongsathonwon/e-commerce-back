import { Router } from "express";
import { adminGuard } from "../middleware";

export const shopRoute = Router()
shopRoute.get(":id") // get shop by id // public
shopRoute.post("", adminGuard) // create shop
shopRoute.post(":id/reviews") // review shop // public