import { Router} from 'express';
import { USERS } from '../data/usersDB.js';

const userRoute = Router();

//*Middleware*//
userRoute.use((req, res, next) => {
  console.log(req.ip);
  next()
})

//*Api */
//get data
userRoute.get("/:_id", (req,res) => {
  const { _id } = req.params
  const user = USERS.find((user) => user._id === _id)
  if(!user) return res.status(404).send()
  return res.send(user)
})
//post
userRoute.post("/", (req,res) => {
  const { _id, name } = req.body;
  if(!_id || !name) return res.status(400).send();
  const user = USERS.find((user) => user._id === _id);
  if(user) return res.status(409).send();
  USERS.push({
    _id, name
  })
  return res.send()
})
//put
userRoute.put("/:_id", (req,res) => {
  const { _id } = req.params;
  const { name } = req.body;
  if(!name) return res.status(400).send()
  const user = USERS.find((user) => user._id === _id);
  if(!user) return res.status(404).send();
  user.name = name;
  return res.send();
})
//delete
userRoute.delete("/:_id", (req,res) => {
  const { _id } = req.params;
  const userIndex = USERS.findIndex((user) => user._id === _id);
  if(!userIndex) return res.status(404).send()
  USERS.splice(userIndex, 1)
  return res.send()
})

export default userRoute