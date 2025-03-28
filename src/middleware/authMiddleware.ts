import { Handler } from "express";
import { verify } from "../lib";
import { IUser } from "../types/auth.type";

const baseAuthMiddleware = (predicateFn: (user: IUser) => boolean): Handler => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return
    }
    try {
        const user = verify(token);
        if (!predicateFn(user)) {
            res.status(403).json({ message: 'unauthorized' })
            return
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

const allowAllRole = (_: IUser) => true
const allowAdmin = ({ role }: IUser) => role === 'admin'
const allowMerchant = ({ role }: IUser) => role !== 'customer'

export const tokenGuard = baseAuthMiddleware(allowAllRole)
export const notCustGuard = baseAuthMiddleware(allowMerchant)
export const adminGuard = baseAuthMiddleware(allowAdmin)