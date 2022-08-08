import { Router } from "express";
// import { USERS } from "../database/usersDB.js";
import checkEmailPassword from "../helpers/check_email_password.js";
const authRouter = Router()

//**End points */
//endpoint public no autenticado no autorizado
authRouter.get("/publico", (req,res) => {
  res.send('EndPoint public');
})

//endpoint autenticado para usuarios registrados
authRouter.post("/autenticado", (req,res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).send();
  
  try {
    const user = checkEmailPassword(email, password);

    return res.send(`Usuario ${user.name} autenticado`);
  }catch(err) {
    return res.status(401).send()
  }
})
//endpoint autorizado para administradores
authRouter.post("/autorizado", (req,res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).send();

  try {
    const user = checkEmailPassword(email, password);

    if(user.role !== "admin") return res.sendStatus(403);

    return res.send(`Usuario administrador ${user.name} autenticado`);
  } catch(err) {
    return res.sendStatus(401);
  }
})

export default authRouter