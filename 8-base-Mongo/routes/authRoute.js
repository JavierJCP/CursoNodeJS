import { Router } from "express";
import checkEmail from "../helpers/checkEmail.js";

const authRoute = Router()
//*EndPoints**/
//public
authRoute.get("/publico", (req, res) => {
  res.send("EndPoint público")
})
//autenticado
authRoute.post("/autenticado", (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.sendStatus(400)
  try{
    const user = checkEmail(email, password)
    return res.send(`Usuario ${user.name} autenticado`)
  }catch(err) {
    return res.sendStatus(err.message)
  }
})
//autorizado
authRoute.post("/autorizado", (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.sendStatus(400)
  try {
    const user = checkEmail(email, password)
    if(user.role !== "admin") return res.sendStatus(403)
    return res.send(`Usuario ${user.name} autorizado`)
  }catch(err) {
    return res.sendStatus(err.message)
  }
})

export default authRoute