import { Router } from "express";
import checkEmailPass from "../helpers/checkEmailPass.js";


const authRoute = Router()

//*EndPoint*//

//publico
authRoute.get("/publico", (req,res) => {
  res.send("EndPoint publico")
})

//autenticado
authRoute.post("/autenticado", (req,res) =>{
  const { email, password} = req.body
  if(!email || !password) return res.sendStatus(400)
  try{
    const user = checkEmailPass(email, password)
    return res.send(`Usuario ${user.name} autenticado`)
  }catch(err) {
    return res.sendStatus(err.message)
  }
})

//autorizado
authRoute.post("/autorizado", (req,res) => {
  const { email, password} = req.body
  if(!email || !password) return res.sendStatus(400)
  try{
    const user = checkEmailPass(email, password)
    if(user.role !== "admin") return res.sendStatus(403)
    return res.send(`Usuario ${user.name} autorizado`)
  }catch(err) {
    return res.sendStatus(err.message)
  }
})

export default authRoute;