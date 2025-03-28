import { integer, pgTable, serial, timestamp, varchar, text, decimal } from "drizzle-orm/pg-core";
import { users } from "./users";
import { baseTimestamp } from "./lib";

export const shops = pgTable('shops', {
    id: serial('id').primaryKey(),
    shopName: varchar('shop_name').notNull(),
    shopDesc: text('description').notNull(),
    owner: integer('owner').references(() => users.id),
    ...baseTimestamp,
    deleteAt: timestamp('delete_at'),
    rating: decimal('rating'),
    reviewCount: integer('review_cnt')
})

