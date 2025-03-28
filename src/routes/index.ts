import { Router } from "express";
import { authRoute } from './auth.routes'
import { orderRoute } from './order.routes'
import { productRoute } from './product.routes'

export const appRoute = Router()
appRoute.use("auth", authRoute)
appRoute.use("orders", orderRoute)
appRoute.use("products", productRoute)