import { TCreateOrder, TCreateOrderItems } from "../db/pg/schema";
import { TContollerBase } from "../types/shared.type";

type TCreateOrderCtrl = TContollerBase<[TCreateOrder, TCreateOrderItems[]], void>
export const createOrderCtrl: TCreateOrderCtrl = (repo) => (req, res, next) => { }