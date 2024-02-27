import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strict', true);

    if (isConnected) {
        console.log('mongoDb is already connected');
        return;
    }

    try {
        await mongoose.createConnection(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        })
        isConnected = true;
        console.log('MONGODB CONNECTED')
    } catch (error) {
        console.error('MONGODB CONNECTION ERROR:', error);
    }
} 