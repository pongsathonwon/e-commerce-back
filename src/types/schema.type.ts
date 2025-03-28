import { orderItems, orders, orderStatus, products, shops, userRole, users } from "../db/pg/schema";

export type TOrderItem = typeof orderItems.$inferSelect;
export type TCreateOrderItems = typeof orderItems.$inferInsert;
export type TOrder = typeof orders.$inferSelect;
export type TCreateOrder = typeof orders.$inferInsert;
export type TProduct = typeof products.$inferSelect;
export type TCreateProduct = typeof products.$inferInsert;
export type TShop = typeof shops.$inferSelect;
export type TCreateShop = typeof shops.$inferInsert;
export type TUser = typeof users.$inferSelect;
export type TCreateUser = typeof users.$inferInsert;
export type TUserRole = typeof userRole.enumValues[number];
export type TOrderStatus = typeof orderStatus.enumValues[number];