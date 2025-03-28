import { Handler } from "express";

export type TContollerBase<T extends unknown[], K, H = Handler> = (repo: TRepository<T, K>) => H

export type TRepository<T extends unknown[], K> = (...arg: T) => Promise<K>

export type TSortMode = 'asc' | 'desc'