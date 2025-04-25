import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connnectCloudinary from "./config/cloudinary.js";



//App Config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connnectCloudinary();


//middlewares
app.use(cors());
app.use(express.json());


//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('API is running...')
})


app.listen(PORT, () => {
    console.log("🚀 [Server] Server is running...");
    console.log(`📡 [Server] Listening on: http://localhost:${PORT}`);
    console.log(`🕒 [Server] Started at: ${new Date().toLocaleString()}`);
  });