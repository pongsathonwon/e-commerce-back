import { Handler } from "express";
import { sign } from "../lib";
import { TRepository } from "../types/shared.type";
import { TCreateUser, TUser } from "../types";


export const signUp = (repo: TRepository<[TCreateUser], TUser[]>): Handler => (req, res, next) => {
    try {
        const body = req.body
        const result = repo(body)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
}

export const signIn = (repo: TRepository<[string], TUser[]>): Handler => async (req, res, next) => {
    try {
        const body = req.body
        const [{ id, username, password, role }] = await repo(body)
        // compare password here

        //sign token
        const token = sign({ id, role })
        res.status(200).json({ token })
    } catch (err) {
        next(err)
    }
}