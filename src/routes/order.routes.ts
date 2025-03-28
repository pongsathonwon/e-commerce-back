import { Router } from "express";
import { tokenGuard } from "../middleware";
import { createOrderCtrl } from "../controller/order.controller";
import { createOrder } from "../repository/order.repository";

export const orderRoute = Router()

const createOrderController = createOrderCtrl(createOrder)
orderRoute.post("", tokenGuard, createOrderController) //create order
orderRoute.patch("/:id", tokenGuard) // update order
orderRoute.delete("/:id", tokenGuard) // delete order
orderRoute.get("", tokenGuard)
// check jwt > if role == customer > only own order,
// if role = merchant > all order from merchant,
// if role == admin > all order