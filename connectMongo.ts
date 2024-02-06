import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI as string);
        console.log("Connect to MongoDB successfully");
    } catch (error) {
        console.log("Connect failed " + error.message);
    }
};

export default connectDB;
