import { integer, numeric, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";
import { shops } from "./shop";
import { baseTimestamp } from "./lib";
import { relations } from "drizzle-orm";

export const orderStatus = pgEnum('order_status', ['cart', 'paid', 'shipping', 'complete', 'cancel'])


export const orders = pgTable('products', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    shopId: integer('shop_id').notNull().references(() => shops.id),
    status: orderStatus().notNull().default('cart'),
    ...baseTimestamp,
    paidAt: timestamp('paid_at'),
    completeAt: timestamp('complete_at'),
    deleteAt: timestamp('delete_at')
})



export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').notNull().references(() => orders.id),
    productId: integer('product_id').notNull().references(() => products.id),
    quantity: integer('quantity').notNull(),
    unitPrice: numeric('unit_price', { mode: 'number' }).notNull(),
    subtotal: numeric('subtotal', { mode: 'number' }).notNull()
})



export const userOrderRelation = relations(users, ({ many }) => ({ orders: many(orders) }))
export const orderUserRelation = relations(orders, ({ one }) => ({ user: one(users, { fields: [orders.userId], references: [users.id] }) }))

export const orderOrderItemRelation = relations(orders, ({ many }) => ({ items: many(orderItems) }))
export const orderItemOrderReleation = relations(orderItems, ({ one }) => ({ order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }) }))