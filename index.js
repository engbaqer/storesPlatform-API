 
// index.js
import express, { json } from 'express';
import Colors from "colors"
import userRoutes from './Routes/userRoutes.js';
import storeRoutes from './Routes/storeRoutes.js';
import cors from 'cors';
import productRoutes from './Routes/productRoutes.js';
// import categoryRoutes from './Routes/categoryRoutes.js';
import orderItemRoutes from './Routes/orderItemRoutes.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());

app.use(json());

app.use('/users', userRoutes);
app.use('/store', storeRoutes);
app.use('/product', productRoutes);
// app.use("/categories", categoryRoutes);
app.use("/order", orderItemRoutes);
/////////////////////////////////////////////////
app.use("/uploads", express.static("uploads"));
/////////////////////////////////////////////////


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000".bgBlue.red);
});
