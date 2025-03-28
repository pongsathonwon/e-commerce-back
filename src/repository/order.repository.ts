import { eq } from "drizzle-orm";
import { db } from "../db/pg/pg";
import { orderItems, orders } from "../db/pg/schema";
import { TCreateOrder, TCreateOrderItems } from "../types";

export const createOrder = async (head: TCreateOrder, list: TCreateOrderItems[]) => {
    await db.transaction(async (trans) => {
        const [{ id }] = await trans.insert(orders).values(head).returning();
        if (!id) {
            trans.rollback();
            return
        }
        const modifiedList = list.map(({ unitPrice, quantity, ...rest }) => ({ ...rest, unitPrice, quantity, subtotal: unitPrice * quantity, orderId: id }))
        trans.insert(orderItems).values(modifiedList)
    })
    return
}

export const getOrderByCust = async (userId: number) => {
    const result = await db.query.orders.findMany({
        columns: {
            id: true,
            status: true
        },
        with: {
            items: true,
            user: true
        },
        where: (orders, { eq }) => eq(orders.userId, userId)
    })

    return result
}