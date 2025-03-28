import mongoose from "mongoose";

export type TReview = {
    productId: number
    userId: number
    review: string
    rating: number
}

export const reviews = new mongoose.Schema<TReview>({
    productId: { type: Number, required: true }
    , userId: { type: Number, required: true }
    , review: { type: String, required: true }
    , rating: { type: Number, required: true, min: 0, max: 5 }
})

