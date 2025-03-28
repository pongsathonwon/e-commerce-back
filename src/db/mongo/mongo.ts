import mongoose from 'mongoose';

export let mg: mongoose.Mongoose
export const init = async () => {
    mg = await mongoose.connect(process.env.MONGO_URI!)
}