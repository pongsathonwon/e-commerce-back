import { eq } from "drizzle-orm"
import { db } from "../db/pg/pg"
import { users } from "../db/pg/schema"
import { TCreateUser } from "../types"

export const getUser = async (username: string) => {
    return await db.select().from(users).where(eq(users.username, username))
}

export const createUser = async (body: TCreateUser) => {
    return await db.insert(users).values(body).returning()
}