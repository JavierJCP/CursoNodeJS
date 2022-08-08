import express from 'express'
import dotenv from 'dotenv'
import usersRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import authSessionRouter from './routes/auth-sesion-router.js'
import cookieParser from 'cookie-parser'
import authTokenRouter from './routes/auth-token-router.js'
import mongoose from 'mongoose'

//config
const app = express()
dotenv.config()
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(express.text())
app.use(cookieParser())

//routes
app.use("/user", usersRoute)
app.use("/auth", authRoute)
app.use("/auth-session", authSessionRouter)
app.use("/auth-token", authTokenRouter)

//connect to mongodb
const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URL)
    //levantar servidor
    app.listen(port, () =>{
      console.log(`App lista en http://localhost:${port}`)
    })
  }catch(err) {
    console.error(err)
  }
}

connectDB();