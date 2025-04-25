import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log("🟢 [MongoDB] Connection Status: Connected ✅");
        });

        mongoose.connection.on('disconnected', () => {
            console.log("🟡 [MongoDB] Connection Status: Disconnected ⚠️");
        });

    } catch (error) {
        console.error("🔴 [MongoDB] Connection Status: Error ❌", error.message);
    }
};

export default connectDB;
