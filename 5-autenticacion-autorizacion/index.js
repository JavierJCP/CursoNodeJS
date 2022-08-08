import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js'
import authRouter from './routes/auth.js';

//servidor
const app = express()
dotenv.config()
const port = process.env.port

//middleware
app.use(express.json());
app.use(express.text());

//Routes
app.use("/user", userRoute);
app.use("/auth", authRouter)

//levantar servidor
app.listen(port, () => {
  console.log(`App lista en http://localhost:${port}`)
})