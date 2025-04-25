import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        mongoose.connection.on('connected', () => {
            console.log("🟢 [MongoDB] Connection Status: Connected ✅");
        });

        mongoose.connection.on('disconnected', () => {
            console.log("🟡 [MongoDB] Connection Status: Disconnected ⚠️");
        });

    } catch (error) {
        console.error("🔴 [MongoDB] Connection Status: Error ❌", error.message);
        process.exit(1); // Изход при фатална грешка
    }
};

export default connectDB;
