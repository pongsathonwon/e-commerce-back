import jwt from 'jsonwebtoken'
import { IUser } from '../types/auth.type'

const secret = "secret"

export const sign = ({ id, role }: IUser) => {
    return jwt.sign({ id, role }, secret)
}

export const verify = (token: string) => {
    const result = jwt.verify(token, secret) as IUser
    return result
}