import { Router } from "express";
import { signIn, signUp } from "../controller";
import { createUser, getUser } from "../repository";

export const authRoute = Router()
authRoute.post("sign-in", signIn(getUser))
authRoute.post("sign-up", signUp(createUser))