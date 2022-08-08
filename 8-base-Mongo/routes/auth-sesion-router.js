import { Router } from 'express'
import { nanoid } from 'nanoid'
import checkEmail from '../helpers/checkEmail.js'
import { USERS } from '../data/usersDB.js'

const authSessionRouter = Router()
const sessions = []

//session
authSessionRouter.post("/login", (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.sendStatus(400)
  try {
    const { _id } = checkEmail(email, password)
    const sessionId = nanoid()
    sessions.push({ sessionId, _id })
    res.cookie("sessionId", sessionId, {httpOnly:true})
    res.send()
  } catch(err) {
    return res.sendStatus(err.message)
  }
})
//solicitud autenticada
authSessionRouter.get("/profile", (req, res) => {
  const { cookies } = req
  if(!cookies.sessionId) return res.sendStatus(400)
  const userSession = sessions.find((session) => session.sessionId === cookies.sessionId)
  if(!userSession) return res.sendStatus(401)
  const user = USERS.find((user) => user._id === userSession._id)
  if(!user) return res.sendStatus(401)
  return res.send(user)
})

export default authSessionRouter