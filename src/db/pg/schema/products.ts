import { decimal, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { shops } from "./shop";
import { baseTimestamp } from "./lib";

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    shopId: integer('shop_id').notNull().references(() => shops.id),
    productName: varchar('product_name').notNull(),
    unitPrice: decimal('unit_price').notNull(),
    remainAmount: integer('remain_amount').notNull(),
    ...baseTimestamp,
    deleteAt: timestamp('delete_at'),
    rating: decimal('rating'),
    reviewCount: integer('review_cnt')
})