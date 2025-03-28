import { baseHandler } from "../types/shared.type";

export const createController = (repo: Function) => (ctrl: baseHandler) => ctrl(repo)