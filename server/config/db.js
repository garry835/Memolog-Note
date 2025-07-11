import mongoose from "mongoose";
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
        console.log(error);
    }
}

export default connectDB;
