import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import authSesionRoute from './routes/authSesionRoute.js'
import authTokenRoute from './routes/authTokenRoute.js'


//crear servidor
const app = express()
dotenv.config()
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(express.text())
app.use(cookieParser())

//routes
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/auth-sesion", authSesionRoute)
app.use("/auth-token", authTokenRoute)

//levantar servidor
app.listen(port, () => {
  console.log(`App lista en http://localhost:${port}`)
})