import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS } from "../data/usersDB.js";
import checkEmailPass from "../helpers/checkEmailPass.js";

const sessions = [];
const authSesionRoute = Router()

authSesionRoute.post("/login", (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.sendStatus(400)
  try {
    const {_id} = checkEmailPass(email, password)
    
    const sessionId = nanoid()
    sessions.push({sessionId, _id})
    res.cookie('sessionId', sessionId, {httpOnly:true, })
    return res.send()
  }catch(err) {
    return res.sendStatus(err.message)
  }
})
//solicitud autenticada con sesion para obtener el perfil del usuario
authSesionRoute.get("/profile", (req, res) => {
  const { cookies } = req;
  if(!cookies.sessionId) return res.sendStatus(401)
  const userSession = sessions.find((session) => session.sessionId === cookies.sessionId)
  if(!userSession) return res.sendStatus(401)
  const user = USERS.find((user) => user._id === userSession._id);
  if(!user) return res.sendStatus(401)
  delete user.password
  return res.send(user)
})

export default authSesionRoute