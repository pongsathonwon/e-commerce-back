import { Router } from "express";
import { notCustGuard, tokenGuard } from "../middleware";
import { createProductCtrl, deleteProductCtrl, updateProductCtrl } from "../controller";
import { createProduct, deleteProduct, updateProduct } from "../repository";

export const productRoute = Router()
const createProductController = createProductCtrl(createProduct)
const deleteProductController = deleteProductCtrl(deleteProduct)
const updateProductController = updateProductCtrl(updateProduct)
productRoute.post("", tokenGuard, createProductController) //create
productRoute.put("/:id", notCustGuard, updateProductController) // update
productRoute.delete("/:id", notCustGuard, deleteProductController) //delete // private role == merchat | admin
productRoute.get("") // get by params // publice route
productRoute.post("/:id/reviews", tokenGuard) // update review