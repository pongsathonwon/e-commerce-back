import { TContollerBase } from "../types/shared.type";
import { TCreateProduct, TProduct } from "../db/pg/schema";


type TCreateProductCtrl = TContollerBase<[TCreateProduct], TProduct[]>
export const createProductCtrl: TCreateProductCtrl = (repo) => async (req, res, next) => {
    try {
        const body = req.body
        const [result] = await repo(body)
        if (!result) {
            res.status(500)
            return
        }
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
}

type TDelProductCtrl = TContollerBase<[number], void>
export const deleteProductCtrl: TDelProductCtrl = (repo) => async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        await repo(id)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}

type TUpdateProductCtrl = TContollerBase<[number, TCreateProduct], TProduct[]>
export const updateProductCtrl: TUpdateProductCtrl = (repo) => async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const body = req.body
        const [result] = await repo(id, body)
        if (!result) {
            res.sendStatus(500);
            return
        }
        res.send(200).json(result)
    } catch (err) {
        next(err)
    }
}