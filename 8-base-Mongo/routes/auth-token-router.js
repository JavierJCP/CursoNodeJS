import { Router } from 'express'
import { SignJWT, jwtVerify } from 'jose'
import checkEmail from '../helpers/checkEmail.js'
import { USERS } from '../data/usersDB.js'
import validateLoginDTO from '../dto/validate-login-dto.js'

const authTokenRouter = Router()

//login with email and password
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
  const { email, password } = req.body
  
  try {
    const { _id } = checkEmail(email, password)
    const encoder = new TextEncoder()
    //get token
    const jwtConstructor = new SignJWT({ _id })
    const jwt = await jwtConstructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

    return res.send({ jwt })
  }catch(err) {
    return res.sendStatus(err.message)
  } 
})

//solicitud autenticada con token
authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers
  if(!authorization) return res.sendStatus(401)
  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY))
    const user = USERS.find((user) => user._id === payload._id)
    if(!user) return res.sendStatus(401)
    delete user.password
    return res.send(user)
  }catch(err) {
    return res.sendStatus(err.message)
  }
})
export default authTokenRouter