import { sql } from "drizzle-orm";
import { integer, pgTable, pgEnum, serial, timestamp, varchar, uniqueIndex, index, check } from "drizzle-orm/pg-core";
import { baseTimestamp } from "./lib";

export const userRole = pgEnum('user_role', ['customer', 'merchant', 'admin'])

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username').unique(),
    password: varchar('password'),
    google: varchar('google').unique(),
    role: userRole().notNull().default('customer'),
    ...baseTimestamp
}, (table) => [
    index("username_idx").on(table.username),
    check("new_user", sql`${table.google} IS NOT NULL OR ${table.username} IS NOT NULL`)
])

