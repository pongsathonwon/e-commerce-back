import { and, asc, desc, eq, ilike, isNull, SQL, SQLWrapper } from "drizzle-orm";
import { db } from "../db/pg/pg";
import { products } from "../db/pg/schema";
import { TSortMode } from "../types/shared.type";
import { TCreateProduct, TProduct } from "../types";

export const createProduct = async (body: TCreateProduct) => {
    return await db.insert(products).values(body).returning()
}

export const updateProduct = async (id: number, body: TCreateProduct) => {
    return await db.update(products).set(body).where(eq(products.id, id)).returning();
}

export const deleteProduct = async (id: number) => {
    const now = new Date()
    await db.update(products).set({ updateAt: now }).where(eq(products.id, id))
    return
}

export const getProduct = async (query: TProductQueryParams) => {
    const [filter, order] = queryMapper(query)
    return await db.select().from(products).where(and(...filter, isNull(products.deleteAt))).orderBy(order)
}

const queryMapper = (query: TProductQueryParams): [SQLWrapper[], SQL] => {
    const filterArr: SQLWrapper[] = []
    const shopId = query.shopId
    if (shopId) {
        filterArr.push(eq(products.shopId, shopId))
    }
    const search = query.search
    if (search) {
        filterArr.push(ilike(products.productName, search))
    }
    const sorter = modeHandler(query.mode)
    return [filterArr, sorter(products[query.orderBy ?? 'rating'])]
}

const modeHandler = (mode: TSortMode | undefined) => {
    if (mode === 'desc') return desc
    return asc
}

type TSortProduct = keyof TProduct

type TProductQueryParams = {
    shopId?: number // eq(shopId, shopId)
    search?: string // ilike(shopName, search)
    orderBy?: TSortProduct
    mode?: TSortMode
}
