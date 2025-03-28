import { timestamp } from "drizzle-orm/pg-core";

export const baseTimestamp = { createAt: timestamp('create_at').defaultNow(), updateAt: timestamp('update_at').defaultNow() }